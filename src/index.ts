interface Profile {
  id: number;
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  repos_url: string;
}
let profilesList: Profile[] = [];
const url: string = "https://api.github.com/users/lehannK";

async function getGithubProfile(url: string) {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
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
    return profileReturned;
  } catch (error) {
    return error;
  }
}

getGithubProfile(url)
  .then((profileReturned) => {
    console.log(profileReturned);
  })
  .catch((error) => console.error(error));
