function fetchUserDetails() {
    const username = document.getElementById("username").value;
    const userDetailsElement = document.getElementById("user-details");
    userDetailsElement.innerHTML = "";

    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                userDetailsElement.innerHTML = "User not found.";
            } else {
                const name = data.name || "N/A";
                const repos = data.public_repos || 0;
                const followers = data.followers || 0;
                const profileUrl = data.html_url;

                const userDetailsHtml = `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Repositories:</strong> ${repos}</p>
                    <p><strong>Followers:</strong> ${followers}</p>
                    <p><a href="${profileUrl}" target="_blank">View Profile</a></p>
                `;
                userDetailsElement.innerHTML = userDetailsHtml;
            }
        })
        .catch(error => {
            userDetailsElement.innerHTML = "An error occurred. Please try again.";
        });
}
