// Security Script - Disable Developer Tools and Prevent Code Copying
(function() {
    'use strict';
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable F12 key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+P (Print)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable paste
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Monitor for developer tools opening
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                devtools.orientation = window.outerHeight - window.innerHeight > threshold ? 'vertical' : 'horizontal';
                onDevToolsOpen();
            }
        } else {
            devtools.open = false;
            devtools.orientation = null;
        }
    }, 500);
    
    function onDevToolsOpen() {
        // Redirect to a warning page or show a message
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Arial, sans-serif;
                font-size: 24px;
                z-index: 999999;
                text-align: center;
                padding: 20px;
            ">
                <div>
                    <h1>⚠️ Access Denied</h1>
                    <p>Developer tools are not allowed on this site.</p>
                    <p>Please close the developer tools to continue.</p>
                </div>
            </div>
        `;
    }
    
    // Disable console methods
    console.log = function() {};
    console.info = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.debug = function() {};
    
    // Disable alert, confirm, prompt
    window.alert = function() {};
    window.confirm = function() { return false; };
    window.prompt = function() { return null; };
    
    // Disable eval and Function constructor
    window.eval = function() { throw new Error('eval is disabled'); };
    window.Function = function() { throw new Error('Function constructor is disabled'); };
    
    // Disable setTimeout and setInterval with string arguments
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    
    window.setTimeout = function(fn, delay) {
        if (typeof fn === 'string') {
            throw new Error('setTimeout with string is disabled');
        }
        return originalSetTimeout(fn, delay);
    };
    
    window.setInterval = function(fn, delay) {
        if (typeof fn === 'string') {
            throw new Error('setInterval with string is disabled');
        }
        return originalSetInterval(fn, delay);
    };
    
    // Disable innerHTML and outerHTML for script tags
    const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    const originalOuterHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
    
    Object.defineProperty(Element.prototype, 'innerHTML', {
        set: function(value) {
            if (typeof value === 'string' && value.toLowerCase().includes('<script')) {
                throw new Error('innerHTML with script tags is disabled');
            }
            originalInnerHTML.set.call(this, value);
        },
        get: originalInnerHTML.get
    });
    
    Object.defineProperty(Element.prototype, 'outerHTML', {
        set: function(value) {
            if (typeof value === 'string' && value.toLowerCase().includes('<script')) {
                throw new Error('outerHTML with script tags is disabled');
            }
            originalOuterHTML.set.call(this, value);
        },
        get: originalOuterHTML.get
    });
    
    // Disable document.write and document.writeln
    document.write = function() {};
    document.writeln = function() {};
    
    // Disable createElement for script tags
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        if (tagName.toLowerCase() === 'script') {
            throw new Error('Creating script elements is disabled');
        }
        return originalCreateElement.call(document, tagName);
    };
    
    // Disable appendChild and insertBefore for script tags
    const originalAppendChild = Node.prototype.appendChild;
    const originalInsertBefore = Node.prototype.insertBefore;
    
    Node.prototype.appendChild = function(child) {
        if (child.tagName && child.tagName.toLowerCase() === 'script') {
            throw new Error('Appending script elements is disabled');
        }
        return originalAppendChild.call(this, child);
    };
    
    Node.prototype.insertBefore = function(newNode, referenceNode) {
        if (newNode.tagName && newNode.tagName.toLowerCase() === 'script') {
            throw new Error('Inserting script elements is disabled');
        }
        return originalInsertBefore.call(this, newNode, referenceNode);
    };
    
    // Disable XMLHttpRequest and fetch for local files
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url && (url.startsWith('file://') || url.startsWith('chrome://'))) {
            throw new Error('Access to local files is disabled');
        }
        return originalXHROpen.call(this, method, url);
    };
    
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        if (url && (url.startsWith('file://') || url.startsWith('chrome://'))) {
            throw new Error('Access to local files is disabled');
        }
        return originalFetch.call(this, url);
    };
    
    // Disable localStorage and sessionStorage
    Object.defineProperty(window, 'localStorage', {
        get: function() {
            throw new Error('localStorage is disabled');
        }
    });
    
    Object.defineProperty(window, 'sessionStorage', {
        get: function() {
            throw new Error('sessionStorage is disabled');
        }
    });
    
    // Disable indexedDB
    Object.defineProperty(window, 'indexedDB', {
        get: function() {
            throw new Error('indexedDB is disabled');
        }
    });
    
    // Disable web workers
    Object.defineProperty(window, 'Worker', {
        get: function() {
            throw new Error('Web Workers are disabled');
        }
    });
    
    // Disable shared workers
    Object.defineProperty(window, 'SharedWorker', {
        get: function() {
            throw new Error('Shared Workers are disabled');
        }
    });
    
    // Disable service workers
    if ('serviceWorker' in navigator) {
        Object.defineProperty(navigator, 'serviceWorker', {
            get: function() {
                throw new Error('Service Workers are disabled');
            }
        });
    }
    
    // Disable geolocation
    if ('geolocation' in navigator) {
        Object.defineProperty(navigator, 'geolocation', {
            get: function() {
                throw new Error('Geolocation is disabled');
            }
        });
    }
    
    // Disable camera and microphone
    if ('mediaDevices' in navigator) {
        Object.defineProperty(navigator, 'mediaDevices', {
            get: function() {
                throw new Error('Media devices are disabled');
            }
        });
    }
    
    // Disable notifications
    if ('Notification' in window) {
        Object.defineProperty(window, 'Notification', {
            get: function() {
                throw new Error('Notifications are disabled');
            }
        });
    }
    
    // Disable push notifications
    if ('PushManager' in window) {
        Object.defineProperty(window, 'PushManager', {
            get: function() {
                throw new Error('Push notifications are disabled');
            }
        });
    }
    
    // Disable clipboard API
    if ('clipboard' in navigator) {
        Object.defineProperty(navigator, 'clipboard', {
            get: function() {
                throw new Error('Clipboard API is disabled');
            }
        });
    }
    
    // Disable web audio API
    if ('AudioContext' in window) {
        Object.defineProperty(window, 'AudioContext', {
            get: function() {
                throw new Error('Web Audio API is disabled');
            }
        });
    }
    
    // Disable webGL
    if ('WebGLRenderingContext' in window) {
        Object.defineProperty(window, 'WebGLRenderingContext', {
            get: function() {
                throw new Error('WebGL is disabled');
            }
        });
    }
    
    // Disable canvas toDataURL and toBlob
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const originalToBlob = HTMLCanvasElement.prototype.toBlob;
    
    HTMLCanvasElement.prototype.toDataURL = function() {
        throw new Error('Canvas toDataURL is disabled');
    };
    
    HTMLCanvasElement.prototype.toBlob = function() {
        throw new Error('Canvas toBlob is disabled');
    };
    
    // Disable image capture
    if ('ImageCapture' in window) {
        Object.defineProperty(window, 'ImageCapture', {
            get: function() {
                throw new Error('Image Capture is disabled');
            }
        });
    }
    
    // Disable screen capture
    if ('getDisplayMedia' in navigator.mediaDevices) {
        Object.defineProperty(navigator.mediaDevices, 'getDisplayMedia', {
            get: function() {
                throw new Error('Screen capture is disabled');
            }
        });
    }
    
    // Disable web speech API
    if ('speechSynthesis' in window) {
        Object.defineProperty(window, 'speechSynthesis', {
            get: function() {
                throw new Error('Speech synthesis is disabled');
            }
        });
    }
    
    if ('SpeechRecognition' in window) {
        Object.defineProperty(window, 'SpeechRecognition', {
            get: function() {
                throw new Error('Speech recognition is disabled');
            }
        });
    }
    
    // Disable web crypto API
    if ('crypto' in window) {
        Object.defineProperty(window, 'crypto', {
            get: function() {
                throw new Error('Web Crypto API is disabled');
            }
        });
    }
    
    // Disable web sockets
    Object.defineProperty(window, 'WebSocket', {
        get: function() {
            throw new Error('WebSockets are disabled');
        }
    });
    
    // Disable server-sent events
    Object.defineProperty(window, 'EventSource', {
        get: function() {
            throw new Error('Server-Sent Events are disabled');
        }
    });
    
    // Disable webRTC
    if ('RTCPeerConnection' in window) {
        Object.defineProperty(window, 'RTCPeerConnection', {
            get: function() {
                throw new Error('WebRTC is disabled');
            }
        });
    }
    
    // Disable web assembly
    if ('WebAssembly' in window) {
        Object.defineProperty(window, 'WebAssembly', {
            get: function() {
                throw new Error('WebAssembly is disabled');
            }
        });
    }
    
    // Disable web animations API
    if ('Animation' in window) {
        Object.defineProperty(window, 'Animation', {
            get: function() {
                throw new Error('Web Animations API is disabled');
            }
        });
    }
    
    // Disable web animations timeline
    if ('DocumentTimeline' in window) {
        Object.defineProperty(window, 'DocumentTimeline', {
            get: function() {
                throw new Error('Document Timeline is disabled');
            }
        });
    }
    
    // Disable web animations group
    if ('GroupEffect' in window) {
        Object.defineProperty(window, 'GroupEffect', {
            get: function() {
                throw new Error('Group Effect is disabled');
            }
        });
    }
    
    // Disable web animations sequence
    if ('SequenceEffect' in window) {
        Object.defineProperty(window, 'SequenceEffect', {
            get: function() {
                throw new Error('Sequence Effect is disabled');
            }
        });
    }
    
    // Disable web animations keyframe effect
    if ('KeyframeEffect' in window) {
        Object.defineProperty(window, 'KeyframeEffect', {
            get: function() {
                throw new Error('Keyframe Effect is disabled');
            }
        });
    }
    
    // Disable web animations animation effect
    if ('AnimationEffect' in window) {
        Object.defineProperty(window, 'AnimationEffect', {
            get: function() {
                throw new Error('Animation Effect is disabled');
            }
        });
    }
    
    // Disable web animations animation timeline
    if ('AnimationTimeline' in window) {
        Object.defineProperty(window, 'AnimationTimeline', {
            get: function() {
                throw new Error('Animation Timeline is disabled');
            }
        });
    }
    
    // Disable web animations animation play state
    if ('AnimationPlayState' in window) {
        Object.defineProperty(window, 'AnimationPlayState', {
            get: function() {
                throw new Error('Animation Play State is disabled');
            }
        });
    }
    
    // Disable web animations animation direction
    if ('AnimationDirection' in window) {
        Object.defineProperty(window, 'AnimationDirection', {
            get: function() {
                throw new Error('Animation Direction is disabled');
            }
        });
    }
    
    // Disable web animations animation fill mode
    if ('AnimationFillMode' in window) {
        Object.defineProperty(window, 'AnimationFillMode', {
            get: function() {
                throw new Error('Animation Fill Mode is disabled');
            }
        });
    }
    
    // Disable web animations animation iteration count
    if ('AnimationIterationCount' in window) {
        Object.defineProperty(window, 'AnimationIterationCount', {
            get: function() {
                throw new Error('Animation Iteration Count is disabled');
            }
        });
    }
    
    // Disable web animations animation name
    if ('AnimationName' in window) {
        Object.defineProperty(window, 'AnimationName', {
            get: function() {
                throw new Error('Animation Name is disabled');
            }
        });
    }
    
    // Disable web animations animation duration
    if ('AnimationDuration' in window) {
        Object.defineProperty(window, 'AnimationDuration', {
            get: function() {
                throw new Error('Animation Duration is disabled');
            }
        });
    }
    
    // Disable web animations animation delay
    if ('AnimationDelay' in window) {
        Object.defineProperty(window, 'AnimationDelay', {
            get: function() {
                throw new Error('Animation Delay is disabled');
            }
        });
    }
    
    // Disable web animations animation timing function
    if ('AnimationTimingFunction' in window) {
        Object.defineProperty(window, 'AnimationTimingFunction', {
            get: function() {
                throw new Error('Animation Timing Function is disabled');
            }
        });
    }
    
    // Disable web animations animation play state
    if ('AnimationPlayState' in window) {
        Object.defineProperty(window, 'AnimationPlayState', {
            get: function() {
                throw new Error('Animation Play State is disabled');
            }
        });
    }
    
    // Disable web animations animation direction
    if ('AnimationDirection' in window) {
        Object.defineProperty(window, 'AnimationDirection', {
            get: function() {
                throw new Error('Animation Direction is disabled');
            }
        });
    }
    
    // Disable web animations animation fill mode
    if ('AnimationFillMode' in window) {
        Object.defineProperty(window, 'AnimationFillMode', {
            get: function() {
                throw new Error('Animation Fill Mode is disabled');
            }
        });
    }
    
    // Disable web animations animation iteration count
    if ('AnimationIterationCount' in window) {
        Object.defineProperty(window, 'AnimationIterationCount', {
            get: function() {
                throw new Error('Animation Iteration Count is disabled');
            }
        });
    }
    
    // Disable web animations animation name
    if ('AnimationName' in window) {
        Object.defineProperty(window, 'AnimationName', {
            get: function() {
                throw new Error('Animation Name is disabled');
            }
        });
    }
    
    // Disable web animations animation duration
    if ('AnimationDuration' in window) {
        Object.defineProperty(window, 'AnimationDuration', {
            get: function() {
                throw new Error('Animation Duration is disabled');
            }
        });
    }
    
    // Disable web animations animation delay
    if ('AnimationDelay' in window) {
        Object.defineProperty(window, 'AnimationDelay', {
            get: function() {
                throw new Error('Animation Delay is disabled');
            }
        });
    }
    
    // Disable web animations animation timing function
    if ('AnimationTimingFunction' in window) {
        Object.defineProperty(window, 'AnimationTimingFunction', {
            get: function() {
                throw new Error('Animation Timing Function is disabled');
            }
        });
    }
    
    console.log('Security measures activated successfully!');
})();
