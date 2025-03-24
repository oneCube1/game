// Search Functionality - Game123.best

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Game database - in a real application, this would come from a server
    const gameDatabase = [
        {
            id: 'monster-survivors',
            title: 'Monster Survivors',
            category: 'action',
            url: '/games/action/monster-survivors.html',
            description: 'Survive endless waves of monsters',
            tags: ['survival', 'action', 'rpg', 'monsters']
        },
        {
            id: 'puzzle-architect',
            title: 'Puzzle Architect',
            category: 'design',
            url: '/games/design/puzzle-architect.html',
            description: 'Design and solve intricate puzzles',
            tags: ['puzzle', 'design', 'brain', 'strategy']
        },
        {
            id: 'soccer-stars',
            title: 'Soccer Stars',
            category: 'sports',
            url: '/games/sports/soccer-stars.html',
            description: 'Compete in fast-paced soccer matches',
            tags: ['soccer', 'sports', 'football', 'multiplayer']
        },
        {
            id: 'retro-adventure',
            title: 'Retro Adventure',
            category: 'pixel',
            url: '/games/pixel/retro-adventure.html',
            description: 'Explore a nostalgic 8-bit world',
            tags: ['adventure', 'pixel', 'retro', 'platformer']
        }
        // Add more games as needed
    ];
    
    // Search function
    function searchGames(query) {
        if (!query || query.length < 2) return [];
        
        query = query.toLowerCase();
        
        return gameDatabase.filter(game => {
            // Check title
            if (game.title.toLowerCase().includes(query)) return true;
            
            // Check description
            if (game.description.toLowerCase().includes(query)) return true;
            
            // Check category
            if (game.category.toLowerCase().includes(query)) return true;
            
            // Check tags
            if (game.tags.some(tag => tag.toLowerCase().includes(query))) return true;
            
            return false;
        });
    }
    
    // Render search results
    function renderSearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No games found</div>';
            return;
        }
        
        const resultsHTML = results.map(game => `
            <a href="${game.url}" class="search-result-item">
                <div class="search-result-title">${game.title}</div>
                <div class="search-result-category">${game.category.charAt(0).toUpperCase() + game.category.slice(1)}</div>
            </a>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
    }
    
    // Event listeners
    if (searchInput) {
        // Live search as user types
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            if (query.length >= 2) {
                const results = searchGames(query);
                renderSearchResults(results);
                searchResults.classList.add('active');
            } else {
                searchResults.classList.remove('active');
            }
        });
        
        // Focus and blur events
        searchInput.addEventListener('focus', function() {
            if (this.value.trim().length >= 2) {
                searchResults.classList.add('active');
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-container')) {
                searchResults.classList.remove('active');
            }
        });
    }
    
    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = searchInput.value.trim();
            
            if (query.length >= 2) {
                // Redirect to search results page with query parameter
                window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Handle search on search results page
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const searchResultsContainer = document.getElementById('search-results-container');
    
    if (searchQuery && searchResultsContainer) {
        // Update search input with query
        if (searchInput) {
            searchInput.value = searchQuery;
        }
        
        // Get and display results
        const results = searchGames(searchQuery);
        
        // Update page title
        document.title = `Search results for "${searchQuery}" - Game123.best`;
        
        // Update heading
        const searchHeading = document.getElementById('search-heading');
        if (searchHeading) {
            searchHeading.textContent = `Search results for "${searchQuery}"`;
        }
        
        // Render results
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No games found for "${searchQuery}"</p>
                    <p>Try different keywords or browse our categories</p>
                </div>
            `;
        } else {
            const resultsHTML = results.map(game => `
                <a href="${game.url}" class="game-card">
                    <div class="game-card-image">
                        <img src="/assets/images/game-thumbnails/${game.id}.jpg" alt="${game.title}" loading="lazy">
                        <div class="game-card-category">${game.category.charAt(0).toUpperCase() + game.category.slice(1)}</div>
                    </div>
                    <div class="game-card-content">
                        <h3 class="game-card-title">${game.title}</h3>
                        <p class="game-card-description">${game.description}</p>
                    </div>
                </a>
            `).join('');
            
            searchResultsContainer.innerHTML = resultsHTML;
        }
    }
}); 