let profilesList = [];
let repositoriesList = [];
async function main() {
    await Promise.all([
        getGithubProfile("https://api.github.com/users/lehannK"),
        getGithubProfile("https://api.github.com/users/rodolfosantos23"),
        getGithubRepos("https://api.github.com/users/lehannK/repos"),
        getGithubRepos("https://api.github.com/users/rodolfosantos23/repos"),
    ]);
    console.log(profilesList);
    console.log(repositoriesList);
}
async function getGithubProfile(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (response.status >= 200 && response.status < 300) {
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
        }
        else {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
    }
}
async function getGithubRepos(urlRepos) {
    try {
        const response = await fetch(urlRepos, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            for (let i of data) {
                const name = i.name;
                const description = i.description;
                const fork = i.fork;
                const stargazers_count = i.stargazers_count;
                const repository = {
                    name,
                    description,
                    fork,
                    stargazers_count,
                };
                repositoriesList.push(repository);
            }
        }
        else {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
    }
}
main();
