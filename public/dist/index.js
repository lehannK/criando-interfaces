let profilesList = [];
let repositoriesList = [];
const url = "https://api.github.com/users/lehannK";
const urlRepos = url + "/repos";
async function getGithubProfile(url) {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        const profileReturned = {
            id: data.id,
            login: data.login,
            name: data.name,
            bio: data.bio,
            public_repos: data.public_repos,
            repos_url: data.repos_url,
        };
        profilesList.push(profileReturned);
        return profileReturned;
    }
    catch (error) {
        return error;
    }
}
async function getGithubRepos(urlRepos) {
    try {
        const response = await fetch(urlRepos);
        if (response.status !== 200) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
    }
    catch (error) {
        console.error("erro");
    }
}
// getGithubProfile(url)
//   .then((profileReturned) => console.log(profileReturned))
//   .catch((error) => console.error(error));
getGithubRepos(urlRepos);
//   .then((repositor) => console.log(profileReturned))
//   .catch((error) => console.error(error));
