/**
 * SCRIPT.JS
 * --------------------------------------------------------
 * Primarily used for the functionality of index.html.
*/

const default_hash = '#home';
const fade_in_delay = 27 // lower values makes the elements show faster on site loading and while changing tabs

let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';

document.addEventListener('DOMContentLoaded', function() {
    /** 
    // Get all hidden update elements
    const hiddenUpdates = document.querySelectorAll('.hidden-update');
    
    // Process each hidden update
    hiddenUpdates.forEach(update => {
        // Get the em element that contains the date
        const dateEm = update.querySelector('em');
        
        if (dateEm) {
            // Check if it already has the ✖ symbol
            if (!dateEm.textContent.includes('✖')) {
                // Add the ✖ symbol at the beginning
                dateEm.innerHTML = '✖ ' + dateEm.innerHTML;
            }
        }
    });
    */
    
    // COMMENTED: SO IF I DONT LIKE IT I CAN REMOVE IT
    // ADD: SMALL DELAY TO ENSURE ELEMENTS ARE LOADED BEFORE SCROLLING
    setTimeout(function() {
        const currentHash = location.hash || default_hash;
        const targetElement = document.getElementById(currentHash.slice(1));
        
        if (targetElement) {
            targetElement.scrollIntoView();
        }
    }, 100);
    // END OF THE COMMENT: SMALL DELAY TO ENSURE ELEMENTS ARE LOADED BEFORE SCROLLING
});

// remove 'rgb' and brackets from --bg-value so the color can be used in combination with individual opacity-values (rgba)
document.documentElement.style.setProperty('--bg-color', getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim().replace(/rgb\(|\)/g, ''));

location = location.hash||default_hash
changeTab(location.hash.slice(1));

window.addEventListener('hashchange', function() {
    changeTab(location.hash.slice(1));
})

function changeTab(tab) {
    try {
        // Hide all visible elements
        document.querySelectorAll('.fade-in.visible').forEach(element => {
            element.classList.remove('visible');
            element.classList.remove('fade-in-anim');
        });

        // Remove active tab class from all tab_switchers
        document.querySelectorAll('.tab_switcher').forEach(element => { 
            element.classList.remove('tab_active'); 
        });

        // Activate the selected tab
        document.getElementById(tab + '_tab').classList.add('tab_active');
        
        // COMMENTED: SO IF I DONT LIKE IT I CAN REMOVE IT
        setTimeout(function() {
            document.getElementById(tab).scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 100);
        
        // Show elements of the selected tab, but EXCLUDE those inside BCUZ IT TAKES SO MUCH TO FUCKING LOAD FUCK U --> .update-content I HATE U
        let allElements = document.getElementById(tab).querySelectorAll('*');
        let elements = Array.from(allElements).filter(el => !el.closest('.update-content'));  // Filter out hidden update content
        
        if (!effectsDisabled) {
            let delay = 0;
            Array.from(elements).forEach(element => {
                element.classList.add('fade-in');
                setTimeout(function() {
                    element.classList.add('visible');
                    element.classList.add('fade-in-anim');
                }, delay);
                delay += fade_in_delay;
            });
        } else {
            // If effects are disabled, make elements visible directly
            Array.from(elements).forEach(element => {
                element.classList.add('visible'); // Ensure elements are visible
            });
        }
    } catch {
        location.hash = default_hash;
    }
}


/**
 * PICTURE COLLECTION
*/
function changeColl(coll) {
    document.querySelectorAll('.pic_coll').forEach(element => { element.style.display = 'none';});
    document.getElementById(coll).style.display = 'block';
    document.querySelectorAll('.pic_coll_tabs').forEach(element => { element.classList.remove('tab_active');});
    this.event.target.classList.add('tab_active');
}




/**
 * PROJECT CATEGORIES
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize with Web Dev projects displayed
    changeColl('webdev');
});

function changeColl(category) {
    // Get all project list items
    const projects = document.querySelectorAll('#pr_list li');

    // Loop through each project item
    projects.forEach(project => {
        // Check if the project belongs to the selected category
        if (project.getAttribute('data-category') === category) {
            project.style.display = ''; // Show the project
        } else {
            project.style.display = 'none'; // Hide the project
        }
    });

    // Update the active class on the tabs
    const tabs = document.querySelectorAll('.pic_coll_tabs');
    tabs.forEach(tab => {
        tab.classList.remove('tab_active'); // Remove active class from all tabs
    });
    
    // Add active class to the currently selected tab
    const activeTab = document.querySelector(`.pic_coll_tabs[onclick="changeColl('${category}')"]`);
    if (activeTab) {
        activeTab.classList.add('tab_active');
    }
}

// Add event listener to the links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        // Check if the clicked link is the projects link
        if (this.getAttribute('href') === '#projects') {
            // Ensure the webdev category is shown
            changeColl('webdev');
        }
    });
});

// Also handle the hash change for back/forward navigation
window.addEventListener('hashchange', function() {
    if (location.hash === '#projects') {
        changeColl('webdev');
    }
});

// Initialize with Web Dev projects displayed on load
document.addEventListener('DOMContentLoaded', function() {
    if (location.hash === '#projects') {
        changeColl('webdev');
    }
});



/**
 * SHOW MORE FOR LATEST UPDATES
*/

/**
document.getElementById("show-more-btn").addEventListener("click", function() {
    const hiddenUpdates = document.querySelectorAll(".hidden-update");
    const button = this;
    
    // Check if updates are currently hidden
    const areUpdatesHidden = hiddenUpdates[0] && hiddenUpdates[0].style.display !== "block";
    
    if (areUpdatesHidden) {
        // Show hidden updates
        hiddenUpdates.forEach(update => {
            update.style.display = "block";
        });
        button.textContent = " < Show Less >"; // Change button text
    } else {
        // Hide updates
        hiddenUpdates.forEach(update => {
            update.style.display = "none";
        });
        button.textContent = " < Show More >"; // Restore button text
    }
});
*/


/**
 * HAMBURGER / NAVBAR
*/


function toggleMenu() {
    const menu = document.getElementById("nav_tabs");
    const hamburger = document.getElementById("hamburger-menu");
    
    menu.classList.toggle("active");
    hamburger.classList.toggle("active"); 
}

const menuItems = document.querySelectorAll("#nav_tabs li a");
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        toggleMenu();
    });
});

// Close the menu if the user clicks anywhere outside the navbar or hamburger
document.addEventListener('click', function(event) {
    const menu = document.getElementById("nav_tabs");
    const hamburger = document.getElementById("hamburger-menu");
    
    // Check if the click happened outside the menu and hamburger
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        // Close the menu
        if (menu.classList.contains("active")) {
            toggleMenu();
        }
    }
});

/**
 * Mobile Dropdown Toggle
*/
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                dropdownToggle.classList.remove('active');
            }
        });
    }
});


/**
 * "NOT CURRENTLY BEING WORKED ON" HOVER OVER TAG
*/
function initTooltips() {
    // Create tooltip container
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    document.body.appendChild(tooltipElement);

    const OFFSET_X = 12; // Horizontal offset from cursor
    const OFFSET_Y = 12; // Vertical offset from cursor

    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach((tooltip) => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            tooltipElement.textContent = tooltipText;
            tooltipElement.style.opacity = '1'; // Make it visible
        });

        tooltip.addEventListener('mousemove', (event) => {
            // Use event.pageX and event.pageY to fix the scroll bug
            let x = event.pageX + OFFSET_X;
            let y = event.pageY + OFFSET_Y;

            // Prevent tooltip from leaving the right edge
            if (x + tooltipElement.offsetWidth > document.documentElement.clientWidth + window.scrollX) {
                x = document.documentElement.clientWidth + window.scrollX - tooltipElement.offsetWidth - OFFSET_X;
            }

            // Prevent tooltip from leaving the bottom edge
            if (y + tooltipElement.offsetHeight > document.documentElement.clientHeight + window.scrollY) {
                y = event.pageY - tooltipElement.offsetHeight - OFFSET_Y; // Move above if no space below
            }

            tooltipElement.style.left = `${x}px`;
            tooltipElement.style.top = `${y}px`;
        });

        tooltip.addEventListener('mouseleave', () => {
            tooltipElement.style.opacity = '0';
        });
    });
}

initTooltips();

/**
 * REAL TIME AGE CALCULATOR
*/

// month starts with 0
const BIRTH_DATE = new Date(2007, 11, 25); // December 25, 2007 (Replace this with yours)

function calculateAge() {
    const now = new Date();
    const birthYear = BIRTH_DATE.getFullYear();
    const birthMonth = BIRTH_DATE.getMonth();
    const birthDay = BIRTH_DATE.getDate();

    let years = now.getFullYear() - birthYear;
    const thisYearsBirthday = new Date(now.getFullYear(), birthMonth, birthDay);

    if (now < thisYearsBirthday) {
        years -= 1;
    }

    const lastBirthday = new Date(now.getFullYear() - (now < thisYearsBirthday ? 1 : 0), birthMonth, birthDay);
    const nextBirthday = new Date(lastBirthday.getFullYear() + 1, birthMonth, birthDay);
    const yearProgress = (now - lastBirthday) / (nextBirthday - lastBirthday);

    return years + yearProgress;
}

function updateAge() {
    const ageElement = document.getElementById('realtime-age');
    if (ageElement) {
        const age = calculateAge();
        ageElement.textContent = age.toFixed(8);
    }
}


/**
 * WRITTEN: 04.12.2024 (on index.html)
*/
function getRelativeDateLabel(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        return 'today';
    }

    if (diffDays >= 365) {
        const years = Math.floor(diffDays / 365);
        const remainingDays = diffDays - years * 365;
        const months = Math.floor(remainingDays / 30);
        if (months > 0) {
            return `${years} year${years === 1 ? '' : 's'}, ${months} month${months === 1 ? '' : 's'} ago`;
        }
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }

    if (diffDays >= 30) {
        const months = Math.floor(diffDays / 30);
        const remainingDays = diffDays - months * 30;
        if (remainingDays > 0) {
            return `${months} month${months === 1 ? '' : 's'}, ${remainingDays} day${remainingDays === 1 ? '' : 's'} ago`;
        }
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }

    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

function setupWrittenDateToggle() {
    const dateEl = document.querySelector('.written-date');
    if (!dateEl) return;

    const absoluteLabel = dateEl.textContent.trim();
    const match = absoluteLabel.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return;
    const [, day, month, year] = match;
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
    if (Number.isNaN(parsedDate.getTime())) return;

    const relativeLabel = getRelativeDateLabel(parsedDate);
    dateEl.textContent = relativeLabel;
    dateEl.dataset.absolute = absoluteLabel;
    dateEl.dataset.relative = relativeLabel;
    dateEl.dataset.mode = 'relative';

    dateEl.addEventListener('click', () => {
        const mode = dateEl.dataset.mode;
        if (mode === 'relative') {
            dateEl.textContent = dateEl.dataset.absolute;
            dateEl.dataset.mode = 'absolute';
        } else {
            dateEl.textContent = dateEl.dataset.relative;
            dateEl.dataset.mode = 'relative';
        }
    });
}

/**
 * POPUP FOR BIRTHDAY
*/

function isBirthday() {
    const today = new Date();
    return today.getMonth() === BIRTH_DATE.getMonth() &&
           today.getDate() === BIRTH_DATE.getDate();
}

let scrollPosition = 0;
let birthdayPopupIsClosing = false;

function createBirthdayPopup(age) {
    const existingPopup = document.getElementById('birthday-popup');
    if (existingPopup) existingPopup.remove();

    birthdayPopupIsClosing = false;

    // Lock body scroll
    scrollPosition = window.scrollY || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Create popup
    const popup = document.createElement('div');
    popup.id = 'birthday-popup';
    popup.innerHTML = `
        <div class="birthday-popup-overlay">
            <div class="birthday-popup-content">
                <div class="birthday-popup-header">
                    <h2>🎉 It's fr0st's Birthday! 🎉</h2>
                    <button class="birthday-close-btn" onclick="closeBirthdayPopup()">×</button>
                </div>
                <hr class="birthday-divider">
                <div class="birthday-popup-body">
                    <p class="birthday-age">fr0st is now <span class="age-highlight">${age}</span> years old!</p>
                    <p class="birthday-message">Want to send a birthday message?</p>
                    <div class="birthday-buttons">
                        <a href="mailto:yo@fr0st.xyz?subject=Happy Birthday!" class="birthday-btn email-btn">
                            <i class="fa-solid fa-envelope"></i>
                            Send Email
                        </a>
                        <a onclick="copyDiscord()" class="birthday-btn discord-btn">
                            <i class="fa-brands fa-discord"></i>
                            Copy Discord
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

function restoreScrollAfterPopup() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollPosition);
}

function closeBirthdayPopup() {
    const popup = document.getElementById('birthday-popup');
    if (!popup) {
        restoreScrollAfterPopup();
        return;
    }

    if (birthdayPopupIsClosing) return;
    birthdayPopupIsClosing = true;

    popup.classList.add('is-closing');
    popup.style.pointerEvents = 'none';

    setTimeout(() => {
        popup.remove();
        restoreScrollAfterPopup();
        birthdayPopupIsClosing = false;
    }, 300);
}


// Discord copy with spam protection
let discordCopyCount = 0;
let isDiscordButtonLocked = false;
let discordLockTimeout = null;

const discordSpamMessages = [
   
];

function copyDiscord() {
    const btn = document.querySelector('.discord-btn');
    
    // If button is locked, show spam message
    if (isDiscordButtonLocked) {
        if (discordCopyCount < discordSpamMessages.length) {
            btn.innerHTML = `<i class="fa-brands fa-discord"></i> ${discordSpamMessages[discordCopyCount]}`;
            discordCopyCount++;
        }
        
        // Reset the timeout to extend the lock
        if (discordLockTimeout) {
            clearTimeout(discordLockTimeout);
        }
        
        discordLockTimeout = setTimeout(() => {
            btn.innerHTML = '<i class="fa-brands fa-discord"></i> Copy Discord';
            btn.classList.remove('copied');
            isDiscordButtonLocked = false;
            discordCopyCount = 0;
            discordLockTimeout = null;
        }, 3000);
        
        return;
    }

    // Lock the button and start spam counter
    isDiscordButtonLocked = true;
    discordCopyCount = 0;
    
    navigator.clipboard.writeText('fr0st.xyz').then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.classList.add('copied');
        
        discordLockTimeout = setTimeout(() => {
            btn.innerHTML = '<i class="fa-brands fa-discord"></i> Copy Discord';
            btn.classList.remove('copied');
            isDiscordButtonLocked = false;
            discordCopyCount = 0;
            discordLockTimeout = null;
        }, 3000);
        
    }).catch(err => {
        console.error('Failed to copy: ', err);
        isDiscordButtonLocked = false;
        discordCopyCount = 0;
    });
}

// Global functions for popup
window.closeBirthdayPopup = closeBirthdayPopup;
window.copyDiscord = copyDiscord;

// Update age immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
    updateAge();
    setInterval(updateAge, 1);
    setupWrittenDateToggle();
    
    // Check if it's birthday and show popup
    if (isBirthday()) {
        const currentAge = Math.floor(calculateAge());
        setTimeout(() => createBirthdayPopup(currentAge), 1000);
    }
});
