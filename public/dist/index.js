let profilesList = [];
const url = "https://api.github.com/users/lehannK";
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
getGithubProfile(url)
    .then((profileReturned) => {
    console.log(profileReturned);
})
    .catch((error) => console.error(error));
