const searchInput = document.querySelector('.search__input');
const search = document.querySelector('.search');
const searchList = document.querySelector('.search__items');
const repositoriesList = document.querySelector('.repository__items');
const searchRender = new Render(searchList, 'search');
const repositoryRender = new Render(repositoriesList, 'repository');

searchInput.onkeyup = throttle(onInput, 150);
searchInput.onfocus = () => searchRender.displayingElements();

searchRender.eventListener('click', (event) => {
  const topic = event.target?.textContent.trim();
  searchInput.value = '';
  repositoryBlockRender(topic);
});

repositoryRender.eventListener('click', (event) => {
  console.log(event.target.id);
  const index = event.target.id.split('-')[1];
  repositoryRender.removeElement(index);
});

const repositoryBlockRender = (topic) => {
  if (!topic) return;
  searchRender.removeElements();
  repositoryRender.removeElements();

  gitHubApi('repositories', [`q=${topic}`, 'per_page=3']).then((data) => {
    data.items.forEach((item, index) => {
      repositoryRender.inner(
        `
                <div >
                    <div>Name: ${item.name}</div>
                    <div>Owner: ${item.owner.login}</div>
                    <div>Starts: ${item.stargazers_count}</div>
                    <span id="delete-${index}" class="delete">X</span>
                </div>
            `,
        index
      );
    });
  });
};

async function onInput(event) {
  try {
    if (event.key === 'Enter') return repositoryBlockRender(searchInput.value);

    const { items } = await gitHubApi('topics', [
      `q=${event.target.value}`,
      'per_page=5',
    ]);

    searchRender.removeElements();
    items.forEach((item) => {
      searchRender.inner(`
                <button class="${searchRender.name}__button">
                    ${item.name}
                </button>
            `);
    });
  } catch (err) {
    console.error(err);
  }
}
