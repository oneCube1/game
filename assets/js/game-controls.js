// Game Controls - Game123.best

document.addEventListener('DOMContentLoaded', function() {
    // Fullscreen toggle functionality
    const gameWrapper = document.getElementById('game-wrapper');
    const gameIframe = document.getElementById('game-iframe');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    if (gameWrapper && fullscreenBtn) {
        let isFullScreen = false;
        
        fullscreenBtn.addEventListener('click', function() {
            if (!isFullScreen) {
                // Enter fullscreen
                enterFullscreen();
            } else {
                // Exit fullscreen
                exitFullscreen();
            }
            
            isFullScreen = !isFullScreen;
        });
        
        // Function to enter fullscreen
        function enterFullscreen() {
            gameWrapper.classList.add('full-screen-container');
            document.body.style.overflow = 'hidden';
            fullscreenBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
            fullscreenBtn.setAttribute('aria-label', 'Exit fullscreen');
            
            // Focus trap in fullscreen mode
            document.addEventListener('keydown', handleFullscreenKeydown);
        }
        
        // Function to exit fullscreen
        function exitFullscreen() {
            gameWrapper.classList.remove('full-screen-container');
            document.body.style.overflow = 'auto';
            fullscreenBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
            `;
            fullscreenBtn.setAttribute('aria-label', 'Enter fullscreen');
            
            // Remove focus trap
            document.removeEventListener('keydown', handleFullscreenKeydown);
        }
        
        // Handle ESC key in fullscreen mode
        function handleFullscreenKeydown(e) {
            if (e.key === 'Escape' && isFullScreen) {
                exitFullscreen();
                isFullScreen = false;
            }
        }
        
        // Also handle browser's fullscreen API
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            if (!document.fullscreenElement && 
                !document.webkitFullscreenElement && 
                !document.mozFullScreenElement && 
                !document.msFullscreenElement) {
                
                // Browser's fullscreen mode was exited
                if (isFullScreen) {
                    exitFullscreen();
                    isFullScreen = false;
                }
            }
        }
    }
    
    // Game controls overlay
    const controlsToggle = document.getElementById('controls-toggle');
    const controlsOverlay = document.getElementById('controls-overlay');
    
    if (controlsToggle && controlsOverlay) {
        controlsToggle.addEventListener('click', function() {
            controlsOverlay.classList.toggle('active');
            
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            
            if (!expanded) {
                this.setAttribute('aria-label', 'Hide controls');
                this.innerHTML = 'Hide Controls';
            } else {
                this.setAttribute('aria-label', 'Show controls');
                this.innerHTML = 'Show Controls';
            }
        });
        
        // Close controls when clicking outside
        document.addEventListener('click', function(event) {
            if (controlsOverlay.classList.contains('active') && 
                !event.target.closest('#controls-overlay') && 
                !event.target.closest('#controls-toggle')) {
                
                controlsOverlay.classList.remove('active');
                controlsToggle.setAttribute('aria-expanded', 'false');
                controlsToggle.setAttribute('aria-label', 'Show controls');
                controlsToggle.innerHTML = 'Show Controls';
            }
        });
    }
    
    // Volume controls
    const volumeSlider = document.getElementById('volume-slider');
    const muteToggle = document.getElementById('mute-toggle');
    
    if (gameIframe && volumeSlider && muteToggle) {
        let volume = 1.0;
        let isMuted = false;
        
        // Update volume
        volumeSlider.addEventListener('input', function() {
            volume = parseFloat(this.value);
            updateVolume();
        });
        
        // Toggle mute
        muteToggle.addEventListener('click', function() {
            isMuted = !isMuted;
            updateVolume();
            
            if (isMuted) {
                this.innerHTML = 'Unmute';
                this.setAttribute('aria-label', 'Unmute game');
            } else {
                this.innerHTML = 'Mute';
                this.setAttribute('aria-label', 'Mute game');
            }
        });
        
        function updateVolume() {
            // This is a simplified example. In reality, you would need to use
            // postMessage to communicate with the iframe content if it's from a different origin
            try {
                const gameWindow = gameIframe.contentWindow;
                gameWindow.postMessage({
                    action: 'setVolume',
                    volume: isMuted ? 0 : volume
                }, '*');
            } catch (error) {
                console.log('Failed to update game volume', error);
            }
        }
    }
}); 