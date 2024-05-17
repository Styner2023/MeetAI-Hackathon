/**
 * This function updates the content in the center panel and the detail panel
 * based on the selected item from the left panel.
 *
 * @param {string} contentId - The ID of the selected content item.
 */
function updateCenterPanel(contentId) {
    const mainContent = document.getElementById('mainContent');
    const detailContent = document.getElementById('detailContent');
    const panel2Title = document.getElementById('panel2-title');

    // Clear the main content and detail content
    mainContent.innerHTML = '';
    detailContent.innerHTML = '';

    // Update the title of the second panel
    panel2Title.textContent = contentId.replace('-', ' ');

    // Load the content based on the contentId
    switch (contentId) {
        case 'public-challenges':
            fetchContent('public-challenges.html', mainContent);
            detailContent.innerHTML = '<h2 class="text-xl font-bold mb-2" aria-live="polite">Details</h2><p aria-live="polite">Select a public challenge to see more details here.</p>';
            break;
        case 'event-recordings':
            fetchContent('event-recordings.html', mainContent);
            detailContent.innerHTML = '<h2 class="text-xl font-bold mb-2" aria-live="polite">Details</h2><p aria-live="polite">Select an event recording to see more details here.</p>';
            break;
        case 'guides-resources':
            fetchContent('guides-resources.html', mainContent);
            detailContent.innerHTML = '<h2 class="text-xl font-bold mb-2" aria-live="polite">Details</h2><p aria-live="polite">Select a guide or resource to see more details here.</p>';
            break;
        case 'public-chat':
            fetchContent('public-chat.html', mainContent);
            detailContent.innerHTML = '<h2 class="text-xl font-bold mb-2" aria-live="polite">Details</h2><p aria-live="polite">Select a chat to see more details here.</p>';
            break;
        default:
            mainContent.innerHTML = '<h1 class="text-3xl font-bold mb-4">Welcome to MeetAI-Hackathon</h1><p>Select a tile from the left panel to view the corresponding content.</p>';
            detailContent.innerHTML = '';
    }

    // Add event listener to "Details" buttons in the center panel
    const detailsButtons = mainContent.querySelectorAll('.details-btn');
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const challengeId = button.getAttribute('data-challenge');
            console.log('Details button clicked for:', challengeId);
            loadDetails(challengeId);
        });
    });
}

/**
 * This function fetches the content from the specified HTML file and inserts it
 * into the target element.
 *
 * @param {string} file - The path to the HTML file.
 * @param {HTMLElement} targetElement - The DOM element where the content should be loaded.
 */
function fetchContent(file, targetElement) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            targetElement.innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            targetElement.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
}/**
 * This function loads the details content into the detail panel based on the
 * selected detail item.
 *
 * @param {string} challengeId - The ID of the selected public challenge.
 */
function loadDetails(challengeId) {
    console.log('loadDetails function called for:', challengeId);
    const detailContent = document.getElementById('detailContent');

    // Find the specific challenge details based on the challengeId
    const challengeDetails = document.getElementById(challengeId);

    if (challengeDetails) {
        // Update the detailContent div with the challenge details
        detailContent.innerHTML = challengeDetails.outerHTML;
    } else {
        detailContent.innerHTML = '<p aria-live="polite">No challenge details found.</p>';
    }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const contentId = this.getAttribute('data-name');
            updateCenterPanel(contentId);
        });
    });

    // Handle "Vote" button click event
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Implement your vote logic here
            console.log('Vote button clicked');
        });
    });
});
