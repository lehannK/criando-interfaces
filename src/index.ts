interface Profile {
  id: number;
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  repos_url: string;
}
interface Repos {
  name: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
}
let profilesList: Profile[] = [];
let repositoriesList: Repos[] = [];

async function main() {
  //mostra todos os usuários salvos
  await Promise.all([
    getGithubProfile("https://api.github.com/users/lehannK"),
    getGithubProfile("https://api.github.com/users/rodolfosantos23"),
    getGithubRepos("https://api.github.com/users/lehannK/repos"),
    getGithubRepos("https://api.github.com/users/rodolfosantos23/repos"),
  ]);
  console.log(profilesList);
  console.log(repositoriesList);
}

async function getGithubProfile(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      const profileReturned: Profile = {
        id: data.id,
        login: data.login,
        name: data.name,
        bio: data.bio,
        public_repos: data.public_repos,
        repos_url: data.repos_url,
      };
      profilesList.push(profileReturned);
    } else {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getGithubRepos(urlRepos: string) {
  try {
    const response = await fetch(urlRepos, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      for (let i of data) {
        const name: string = i.name;
        const description: string = i.description;
        const fork: boolean = i.fork;
        const stargazers_count: number = i.stargazers_count;
        const repository: Repos = {
          name,
          description,
          fork,
          stargazers_count,
        };
        repositoriesList.push(repository);
      }
    } else {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

main();
