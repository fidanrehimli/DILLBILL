document.getElementById('searchBtn').addEventListener('click', function() {
    var username = document.getElementById('username').value.trim();
    if (username === '') {
      alert('Please enter a GitHub username');
      return;
    }
    
    fetch('https://api.github.com/users/' + username)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayUser(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('User not found or there was an error');
      });
  });
  
  function displayUser(user) {
    var resultsDiv = document.getElementById('results');
    var card = document.createElement('div');
    card.classList.add('card');
  
    var avatarImg = document.createElement('img');
    avatarImg.src = user.avatar_url;
    avatarImg.alt = 'Avatar';
    avatarImg.style.width = '100px';
    avatarImg.style.height = '100px';
  
    var usernameHeading = document.createElement('h2');
    usernameHeading.textContent = user.login;
  
    var followersPara = document.createElement('p');
    followersPara.textContent = 'Followers: ' + user.followers;
  
    var followingPara = document.createElement('p');
    followingPara.textContent = 'Following: ' + user.following;
  
    var reposPara = document.createElement('p');
    reposPara.textContent = 'Public Repositories: ' + user.public_repos;
  
    var profileLink = document.createElement('a');
    profileLink.href = user.html_url;
    profileLink.target = '_blank';
    profileLink.textContent = 'View Profile';
  
    card.appendChild(avatarImg);
    card.appendChild(usernameHeading);
    card.appendChild(followersPara);
    card.appendChild(followingPara);
    card.appendChild(reposPara);
    card.appendChild(profileLink);
  
    resultsDiv.innerHTML = ''; // Clear previous results
    resultsDiv.appendChild(card);
  }