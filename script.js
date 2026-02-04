// Theme definitions
const themes = {
  'default': {
    'paper-cream': '38 22% 94%',
    'paper-warm': '38 20% 91%',
    'paper-insert': '38 18% 88%',
    'paper-aged': '38 16% 85%',
    'ink-dark': '30 15% 20%',
    'ink-medium': '30 10% 35%',
    'ink-light': '30 8% 50%',
    'ink-faded': '30 5% 65%',
    'shadow-paper': '30 20% 20%',
    'rot': '#e8e0e0',
    'getting-ready': '#f0ede8',
    'transit': '#e8e5e0',
    'meals': '#ede8e8',
    'packing': '#e8e5e0',
    'custom': '#f0ede8',
    'svg-color': '#735A47',
    'button-color': '15 45% 55%'
  },
  'warm-pastels': {
    'paper-cream': '340 30% 96%', // Very light pink
    'paper-warm': '340 25% 93%',
    'paper-insert': '340 22% 90%',
    'paper-aged': '340 20% 87%',
    'ink-dark': '340 25% 25%', // Deep rose
    'ink-medium': '340 20% 40%',
    'ink-light': '340 15% 55%',
    'ink-faded': '340 10% 70%',
    'shadow-paper': '340 30% 25%',
    'rot': '#ffd6e8', // Bright pink
    'getting-ready': '#ffe8f0', // Light pink
    'transit': '#ffd6e0', // Rose pink
    'meals': '#ffe0e8', // Soft pink
    'packing': '#ffe8e8', // Warm pink
    'custom': '#fff0f0', // Pale pink
    'svg-color': '#B85A6B',
    'button-color': '340 50% 60%'
  },
  'cool-tones': {
    'paper-cream': '210 25% 97%', // Very light blue
    'paper-warm': '210 20% 94%',
    'paper-insert': '210 18% 91%',
    'paper-aged': '210 15% 88%',
    'ink-dark': '210 30% 25%', // Deep blue-gray
    'ink-medium': '210 25% 40%',
    'ink-light': '210 20% 55%',
    'ink-faded': '210 15% 70%',
    'shadow-paper': '210 35% 30%',
    'rot': '#d6e8ff', // Light blue
    'getting-ready': '#e0f0ff', // Sky blue
    'transit': '#cce0ff', // Bright blue
    'meals': '#d6e8ff', // Periwinkle
    'packing': '#e0e8ff', // Lavender blue
    'custom': '#e8f0ff', // Pale blue
    'svg-color': '#4A6B9B',
    'button-color': '210 55% 55%'
  },
  'earth-tones': {
    'paper-cream': '45 35% 92%', // Warm beige
    'paper-warm': '45 30% 89%',
    'paper-insert': '45 28% 86%',
    'paper-aged': '45 25% 83%',
    'ink-dark': '45 40% 20%', // Deep brown
    'ink-medium': '45 35% 35%',
    'ink-light': '45 30% 50%',
    'ink-faded': '45 25% 65%',
    'shadow-paper': '45 45% 25%',
    'rot': '#d5c4a8', // Tan
    'getting-ready': '#e8d8c4', // Sand
    'transit': '#c4b898', // Khaki
    'meals': '#d5c4b8', // Taupe
    'packing': '#c4b8a8', // Brown-beige
    'custom': '#e8d8c4', // Light sand
    'svg-color': '#8B6F47',
    'button-color': '45 50% 45%'
  },
  'sunset': {
    'paper-cream': '15 40% 97%', // Very light orange
    'paper-warm': '15 35% 94%',
    'paper-insert': '15 30% 91%',
    'paper-aged': '15 28% 88%',
    'ink-dark': '15 45% 25%', // Deep orange-brown
    'ink-medium': '15 40% 40%',
    'ink-light': '15 35% 55%',
    'ink-faded': '15 30% 70%',
    'shadow-paper': '15 50% 30%',
    'rot': '#ffccb8', // Coral
    'getting-ready': '#ffe0cc', // Peach
    'transit': '#ffd6cc', // Apricot
    'meals': '#ffe8d6', // Warm peach
    'packing': '#ffd6b8', // Orange
    'custom': '#fff0e0', // Cream
    'svg-color': '#D87A47',
    'button-color': '15 60% 55%'
  }
};

let currentTheme = 'default';

// Pre-arrival realities with editable durations (in minutes)
let realities = [
  { id: 'scrolling', label: 'scrolling before getting up', duration: 15, category: 'rot', optional: false },
  { id: 'indecision', label: 'indecision / staring at the mirror', duration: 12, category: 'rot', optional: true },
  { id: 'breakfast', label: 'breakfast / morning routine', duration: 20, category: 'meals', optional: true },
  { id: 'lunch', label: 'lunch', duration: 30, category: 'meals', optional: true },
  { id: 'dinner', label: 'dinner', duration: 45, category: 'meals', optional: true },
  { id: 'shower', label: 'showering', duration: 20, category: 'getting-ready', optional: false },
  { id: 'daily-makeup', label: 'daily makeup', duration: 10, category: 'getting-ready', optional: true },
  { id: 'full-makeup', label: 'full makeup', duration: 30, category: 'getting-ready', optional: true },
  { id: 'getting-ready', label: 'getting ready / grooming', duration: 15, category: 'getting-ready', optional: false },
  { id: 'getting-dressed', label: 'getting dressed / choosing outfit', duration: 10, category: 'getting-ready', optional: false },
  { id: 'packing', label: 'packing bag / gathering things', duration: 8, category: 'packing', optional: true },
  { id: 'travel-time', label: 'travel time', duration: 30, editableInSidebar: true, category: 'transit', optional: false },
  { id: 'walking', label: 'walking to transit', duration: 8, category: 'transit', optional: false },
  { id: 'waiting', label: 'waiting for transit', duration: 10, category: 'transit', optional: false },
  { id: 'transfer', label: 'transfer buffer', duration: 5, category: 'transit', optional: true }
];

// Track which activities are marked as optional in the current plan
let optionalActivities = new Set();

let customRealityCounter = 0;

// Track which category folders are expanded (default: all collapsed)
let expandedCategories = new Set();

// Track which realities are presets (not custom)
const presetRealityIds = new Set(['scrolling', 'breakfast', 'lunch', 'dinner', 'shower', 'daily-makeup', 'full-makeup', 'getting-ready', 'indecision', 'getting-dressed', 'packing', 'travel-time', 'walking', 'waiting', 'transfer']);

// Labels for timeline stages (how they appear in the timeline)
const stageLabels = {
  scrolling: 'start scrolling',
  breakfast: 'start breakfast',
  lunch: 'start lunch',
  dinner: 'start dinner',
  shower: 'start showering',
  'daily-makeup': 'start daily makeup',
  'full-makeup': 'start full makeup',
  'getting-ready': 'start getting ready',
  indecision: 'start getting ready',
  'getting-dressed': 'start getting dressed',
  packing: 'start packing',
  'travel-time': 'travel time',
  walking: 'leave apartment',
  waiting: 'be at transit',
  transfer: 'transfer'
};

// Order of planned realities (the order they appear in planning area)
let plannedRealities = [];

let arrivalTime = null;
let timeFormat = '12'; // '12' for 12-hour, '24' for 24-hour
let timelineData = []; // Store calculated timeline for notifications
let notificationCheckInterval = null;
let savedPlans = []; // Store saved plan configurations
let planHistory = []; // Store plan usage history
let notificationPermission = 'default'; // 'default', 'granted', 'denied'
let notificationSettings = {
  enabled: true,
  advanceWarning: 5, // minutes
  useBrowserNotifications: true,
  soundEnabled: false
};


// Initialize the app
// Load SVG inline so we can change its color
async function loadSvgInline() {
  const svgImg = document.querySelector('.hand-drawn-oval');
  if (!svgImg || svgImg.tagName === 'svg') return; // Already inline or doesn't exist
  
  try {
    const response = await fetch(svgImg.src);
    const svgText = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    
    if (svgElement) {
      // Copy attributes from img to svg
      svgElement.setAttribute('class', svgImg.className);
      svgElement.setAttribute('style', svgImg.getAttribute('style') || '');
      svgElement.style.width = svgImg.style.width || '100%';
      svgElement.style.height = svgImg.style.height || '100%';
      
      // Replace img with inline SVG
      svgImg.parentNode.replaceChild(svgElement, svgImg);
      
      // Apply current theme color
      const currentThemeObj = themes[currentTheme];
      if (currentThemeObj && currentThemeObj['svg-color']) {
        const path = svgElement.querySelector('path');
        if (path) {
          path.setAttribute('fill', currentThemeObj['svg-color']);
        }
      }
    }
  } catch (error) {
    console.error('Failed to load SVG inline:', error);
  }
}

// Browser Notification API support
function checkNotificationSupport() {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    notificationSettings.useBrowserNotifications = false;
    return false;
  }
  return true;
}

function requestNotificationPermission() {
  if (!checkNotificationSupport()) {
    return Promise.resolve('unsupported');
  }
  
  if (Notification.permission === 'granted') {
    notificationPermission = 'granted';
    return Promise.resolve('granted');
  }
  
  if (Notification.permission === 'denied') {
    notificationPermission = 'denied';
    return Promise.resolve('denied');
  }
  
  // Request permission
  return Notification.requestPermission().then(permission => {
    notificationPermission = permission;
    return permission;
  });
}

function init() {
  // Load saved time format preference
  const savedFormat = localStorage.getItem('timeFormat');
  if (savedFormat === '12' || savedFormat === '24') {
    timeFormat = savedFormat;
  }
  
  // Set time format selector
  const timeFormatSelect = document.getElementById('time-format');
  if (timeFormatSelect) {
    timeFormatSelect.value = timeFormat;
  }
  
  // Load notification settings
  loadNotificationSettings();
  
  // Check and request notification permission if supported
  // Don't auto-request, let user enable via settings
  if (checkNotificationSupport()) {
    // Just update UI, don't request permission automatically
    setTimeout(() => {
      updateNotificationPermissionUI();
    }, 100);
  }
  
  // Check if user has seen onboarding
  checkAndShowOnboarding();
  
  // Load saved theme preference
  loadTheme();
  
  // Load SVG inline so we can change its color
  loadSvgInline();
  
  // Ensure preset realities are always present (safety check)
  ensurePresetRealities();
  
  // Load custom realities from localStorage
  loadCustomRealities();
  
  // Load optional activities
  loadOptionalActivities();
  
  // Load expanded categories state
  loadExpandedCategories();
  
  // Load saved plans from localStorage
  loadSavedPlans();
  
  renderAvailableRealities();
  renderPlannedRealities();
  renderAddCustom();
  renderSavedPlans();
  renderPlanHistory();
  setupEventListeners();
  setupDragAndDrop();
  setupKeyboardAccessibility();
  setupCornerFoldResize();
  setupMobileRealitySelector();
  setupMobileGestures();
  initCreditSection();
}

// Ensure all preset realities exist in the realities array
function ensurePresetRealities() {
  const presetRealityDefinitions = [
    { id: 'scrolling', label: 'scrolling before getting up', duration: 15, category: 'rot', optional: false },
    { id: 'indecision', label: 'indecision / staring at the mirror', duration: 12, category: 'rot', optional: true },
    { id: 'breakfast', label: 'breakfast / morning routine', duration: 20, category: 'meals', optional: true },
    { id: 'lunch', label: 'lunch', duration: 30, category: 'meals', optional: true },
    { id: 'dinner', label: 'dinner', duration: 45, category: 'meals', optional: true },
    { id: 'shower', label: 'showering', duration: 20, category: 'getting-ready', optional: false },
    { id: 'daily-makeup', label: 'daily makeup', duration: 10, category: 'getting-ready', optional: true },
    { id: 'full-makeup', label: 'full makeup', duration: 30, category: 'getting-ready', optional: true },
    { id: 'getting-ready', label: 'getting ready / grooming', duration: 15, category: 'getting-ready', optional: false },
    { id: 'getting-dressed', label: 'getting dressed / choosing outfit', duration: 10, category: 'getting-ready', optional: false },
    { id: 'packing', label: 'packing bag / gathering things', duration: 8, category: 'packing', optional: true },
    { id: 'travel-time', label: 'travel time', duration: 30, editableInSidebar: true, category: 'transit', optional: false },
    { id: 'walking', label: 'walking to transit', duration: 8, category: 'transit', optional: false },
    { id: 'waiting', label: 'waiting for transit', duration: 10, category: 'transit', optional: false },
    { id: 'transfer', label: 'transfer buffer', duration: 5, category: 'transit', optional: true }
  ];
  
  presetRealityDefinitions.forEach(preset => {
    const existing = realities.find(r => r.id === preset.id);
    if (!existing) {
      // Preset is missing, add it back
      realities.push(preset);
      console.warn('Restored missing preset reality:', preset.id);
    } else {
      // Update properties if needed (preserve duration if user modified it)
      const currentDuration = existing.duration;
      Object.assign(existing, preset);
      existing.duration = currentDuration; // Preserve user-modified duration
    }
  });
}

// Notification settings management
function loadNotificationSettings() {
  const saved = localStorage.getItem('notificationSettings');
  if (saved) {
    try {
      const settings = JSON.parse(saved);
      notificationSettings = { ...notificationSettings, ...settings };
    } catch (e) {
      console.error('Failed to load notification settings', e);
    }
  }
}

function saveNotificationSettings() {
  localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
}

// Theme management
function loadTheme() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && themes[savedTheme]) {
    currentTheme = savedTheme;
  }
  applyTheme(currentTheme);
  
  // Set theme selector value
  const themeSelector = document.getElementById('theme-selector');
  if (themeSelector) {
    themeSelector.value = currentTheme;
  }
}

function saveTheme(theme) {
  localStorage.setItem('selectedTheme', theme);
}

function applyTheme(themeName) {
  if (!themes[themeName]) return;
  
  currentTheme = themeName;
  const theme = themes[themeName];
  
  // Update page background colors
  document.documentElement.style.setProperty('--paper-cream', theme['paper-cream']);
  document.documentElement.style.setProperty('--paper-warm', theme['paper-warm']);
  document.documentElement.style.setProperty('--paper-insert', theme['paper-insert']);
  document.documentElement.style.setProperty('--paper-aged', theme['paper-aged']);
  
  // Update ink colors
  if (theme['ink-dark']) {
    document.documentElement.style.setProperty('--ink-dark', theme['ink-dark']);
  }
  if (theme['ink-medium']) {
    document.documentElement.style.setProperty('--ink-medium', theme['ink-medium']);
  }
  if (theme['ink-light']) {
    document.documentElement.style.setProperty('--ink-light', theme['ink-light']);
  }
  if (theme['ink-faded']) {
    document.documentElement.style.setProperty('--ink-faded', theme['ink-faded']);
  }
  
  // Update shadow color
  if (theme['shadow-paper']) {
    document.documentElement.style.setProperty('--shadow-paper', theme['shadow-paper']);
  }
  
  // Update category colors
  document.documentElement.style.setProperty('--category-rot', theme.rot);
  document.documentElement.style.setProperty('--category-getting-ready', theme['getting-ready']);
  document.documentElement.style.setProperty('--category-transit', theme.transit);
  document.documentElement.style.setProperty('--category-meals', theme.meals);
  document.documentElement.style.setProperty('--category-packing', theme.packing);
  document.documentElement.style.setProperty('--category-custom', theme.custom);
  
  // Update SVG and button colors
  if (theme['svg-color']) {
    document.documentElement.style.setProperty('--svg-color', theme['svg-color']);
    // Update SVG fill color (works for inline SVG)
    const svg = document.querySelector('.hand-drawn-oval');
    if (svg) {
      // If it's an inline SVG, update fill directly
      if (svg.tagName === 'svg') {
        const path = svg.querySelector('path');
        if (path) {
          path.setAttribute('fill', theme['svg-color']);
        }
      } else {
        // If it's still an img, try to load inline (may not have loaded yet)
        loadSvgInline().then(() => {
          const inlineSvg = document.querySelector('.hand-drawn-oval');
          if (inlineSvg && inlineSvg.tagName === 'svg') {
            const path = inlineSvg.querySelector('path');
            if (path) {
              path.setAttribute('fill', theme['svg-color']);
            }
          }
        });
      }
    }
  }
  if (theme['button-color']) {
    document.documentElement.style.setProperty('--accent-warm', theme['button-color']);
  }
  
  saveTheme(themeName);
}

// Render available realities in sidebar
function renderAvailableRealities() {
  const availableSection = document.getElementById('available-realities');
  if (!availableSection) {
    console.error('available-realities element not found');
    return;
  }
  
  availableSection.innerHTML = '';

  // Group preset realities by category
  const presetRealities = realities.filter(r => presetRealityIds.has(r.id));
  
  const categories = {
    'rot': [],
    'meals': [],
    'getting-ready': [],
    'packing': [],
    'transit': []
  };
  
  presetRealities.forEach(reality => {
    const category = reality.category || 'getting-ready';
    if (categories[category]) {
      categories[category].push(reality);
    }
  });
  
  // Render each category group - order: getting ready, meals, transit
  const categoryOrder = ['getting-ready', 'meals', 'transit', 'rot', 'packing'];
  const categoryLabels = {
    'rot': 'rot',
    'meals': 'meals',
    'getting-ready': 'getting ready',
    'packing': 'packing',
    'transit': 'transit / travel'
  };
  
  categoryOrder.forEach(categoryKey => {
    const categoryRealities = categories[categoryKey];
    if (categoryRealities.length > 0) {
      const categoryGroup = document.createElement('div');
      categoryGroup.className = 'reality-category';
      categoryGroup.dataset.category = categoryKey;
      
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'category-header folder-tab';
      categoryHeader.textContent = categoryLabels[categoryKey];
      categoryHeader.setAttribute('data-label', categoryLabels[categoryKey]);
      categoryHeader.setAttribute('role', 'button');
      categoryHeader.setAttribute('tabindex', '0');
      categoryHeader.setAttribute('aria-expanded', expandedCategories.has(categoryKey) ? 'true' : 'false');
      
      // Add click handler for toggle
      categoryHeader.addEventListener('click', () => toggleCategory(categoryKey));
      categoryHeader.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCategory(categoryKey);
        }
      });
      
      categoryGroup.appendChild(categoryHeader);
      
      const categoryItems = document.createElement('div');
      categoryItems.className = 'category-items';
      // Don't set display here - CSS handles the slide animation
      
      categoryRealities.forEach(reality => {
        const item = createAvailableRealityItem(reality);
        categoryItems.appendChild(item);
      });
      
      categoryGroup.appendChild(categoryItems);
      availableSection.appendChild(categoryGroup);
    }
  });

  // Setup category folder tabs (must be after rendering)
  setupCategoryFolders();
  
  // Update keyboard accessibility after rendering
  setTimeout(() => {
    updateKeyboardAccessibility();
  }, 0);

  // Render custom realities (no category) - also as a folder tab
  const customRealities = realities.filter(r => !presetRealityIds.has(r.id));
  if (customRealities.length > 0) {
    const customGroup = document.createElement('div');
    customGroup.className = 'reality-category';
    customGroup.dataset.category = 'custom';
    
    const customHeader = document.createElement('div');
    customHeader.className = 'category-header folder-tab';
    customHeader.textContent = 'custom';
    customHeader.setAttribute('role', 'button');
    customHeader.setAttribute('tabindex', '0');
    customHeader.setAttribute('aria-expanded', expandedCategories.has('custom') ? 'true' : 'false');
    
    // Add click handler for toggle
    customHeader.addEventListener('click', () => toggleCategory('custom'));
    customHeader.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCategory('custom');
      }
    });
    
    customGroup.appendChild(customHeader);
    
    const customItems = document.createElement('div');
    customItems.className = 'category-items';
    customItems.style.display = expandedCategories.has('custom') ? 'flex' : 'none';
    
    customRealities.forEach(reality => {
      const item = createAvailableRealityItem(reality);
      customItems.appendChild(item);
    });
    
    customGroup.appendChild(customItems);
    availableSection.appendChild(customGroup);
  }
}

// Create an available reality item (in sidebar)
function createAvailableRealityItem(reality) {
  const container = document.createElement('div');
  container.className = 'available-reality-item';
  container.draggable = true;
  container.dataset.realityId = reality.id;
  
  // Add category color class
  if (reality.category) {
    container.dataset.category = reality.category;
  }
  
  const label = document.createElement('span');
  label.className = 'reality-label';
  label.textContent = reality.label;
  
  // If this reality has editableInSidebar flag (like travel time), show input instead of badge
  if (reality.editableInSidebar) {
    const durationContainer = document.createElement('div');
    durationContainer.className = 'duration-input-container';
    
    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.className = 'duration-input-sidebar';
    durationInput.value = reality.duration;
    durationInput.min = 1;
    durationInput.max = 300;
    durationInput.addEventListener('change', (e) => {
      const newDuration = parseInt(e.target.value, 10);
      if (newDuration > 0 && newDuration <= 300) {
        reality.duration = newDuration;
        // Save custom realities if this is a custom reality
        if (!presetRealityIds.has(reality.id)) {
          saveCustomRealities();
        }
      } else {
        e.target.value = reality.duration; // Reset if invalid
      }
    });
    durationInput.addEventListener('blur', (e) => {
      const newDuration = parseInt(e.target.value, 10);
      if (newDuration > 0 && newDuration <= 300) {
        reality.duration = newDuration;
        // Save custom realities if this is a custom reality
        if (!presetRealityIds.has(reality.id)) {
          saveCustomRealities();
        }
      } else {
        e.target.value = reality.duration; // Reset if invalid
      }
    });
    
    // Prevent dragging when interacting with input
    durationInput.addEventListener('mousedown', (e) => e.stopPropagation());
    durationInput.addEventListener('focus', () => {
      container.draggable = false;
    });
    durationInput.addEventListener('blur', () => {
      container.draggable = true;
    });
    
    const durationLabel = document.createElement('span');
    durationLabel.className = 'duration-label-sidebar';
    durationLabel.textContent = 'min';
    
    durationContainer.appendChild(durationInput);
    durationContainer.appendChild(durationLabel);
    container.appendChild(label);
    container.appendChild(durationContainer);
  } else {
    const duration = document.createElement('span');
    duration.className = 'duration-badge';
    duration.textContent = `${reality.duration} min`;
    
    container.appendChild(label);
    container.appendChild(duration);
  }
  
  // Add delete button for custom realities only (not presets)
  const isCustom = !presetRealityIds.has(reality.id);
  if (isCustom) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'custom-reality-delete';
    deleteButton.textContent = '×';
    deleteButton.title = 'delete this custom preset';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCustomReality(reality.id);
    });
    
    // Prevent dragging when clicking delete button
    deleteButton.addEventListener('mousedown', (e) => e.stopPropagation());
    
    container.appendChild(deleteButton);
  }
  
  return container;
}

// Render planned realities in planning area
function renderPlannedRealities() {
  const plannedSection = document.getElementById('planned-realities');
  const emptyState = plannedSection.querySelector('.empty-state');
  
  // Reset button visibility is handled by hover, but ensure it's hidden when plan is empty
  const resetButton = document.getElementById('reset-plan');
  if (resetButton && plannedRealities.length === 0) {
    resetButton.style.display = 'none';
  }
  
  // Remove all planned items except empty state
  const existingItems = plannedSection.querySelectorAll('.planned-reality-item');
  existingItems.forEach(item => item.remove());
  
  if (plannedRealities.length === 0) {
    if (!emptyState) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'pick realities to build your timeline';
      plannedSection.appendChild(empty);
    }
  } else {
    if (emptyState) {
      emptyState.remove();
    }
    
    plannedRealities.forEach(realityId => {
      const reality = realities.find(r => r.id === realityId);
      if (reality) {
        const item = createPlannedRealityItem(reality);
        plannedSection.appendChild(item);
      }
    });
  }
  
  // Update keyboard accessibility after rendering
  setTimeout(() => {
    updateKeyboardAccessibility();
    setupMobileGestures(); // Re-setup mobile gestures for new items
  }, 0);
  
  // Don't auto-calculate timeline, wait for button click
}

// Create a planned reality item (in planning area)
function createPlannedRealityItem(reality) {
  const container = document.createElement('div');
  container.className = 'planned-reality-item';
  container.draggable = true;
  container.dataset.realityId = reality.id;
  
  // Add category data attribute for styling
  if (reality.category) {
    container.dataset.category = reality.category;
  }
  
  const label = document.createElement('span');
  label.className = 'reality-label';
  label.textContent = reality.label;
  
  const controls = document.createElement('div');
  controls.className = 'reality-controls';
  
  const durationContainer = document.createElement('span');
  durationContainer.className = 'duration-container';
  
  const durationInput = document.createElement('input');
  durationInput.type = 'number';
  durationInput.className = 'duration-input';
  durationInput.value = reality.duration;
  durationInput.min = 1;
  durationInput.max = 300;
  durationInput.addEventListener('change', (e) => handleDurationChange(reality.id, e.target.value));
  durationInput.addEventListener('blur', (e) => handleDurationChange(reality.id, e.target.value));
  
  const durationLabel = document.createElement('span');
  durationLabel.className = 'duration-label';
  durationLabel.textContent = 'min';
  
  const removeButton = document.createElement('button');
  removeButton.className = 'remove-button';
  removeButton.textContent = '×';
  removeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromPlan(reality.id);
  });
  
  // Add optional toggle if activity can be optional
  const optionalToggle = document.createElement('button');
  optionalToggle.className = 'optional-toggle';
  optionalToggle.setAttribute('aria-label', 'toggle optional');
  optionalToggle.title = 'mark as optional';
  const isOptional = optionalActivities.has(reality.id);
  optionalToggle.textContent = isOptional ? '○' : '◉';
  optionalToggle.dataset.optional = isOptional.toString();
  
  optionalToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleOptional(reality.id);
  });
  
  // Mark container as optional if needed
  if (isOptional) {
    container.classList.add('optional-activity');
  }
  
  durationContainer.appendChild(durationInput);
  durationContainer.appendChild(durationLabel);
  controls.appendChild(durationContainer);
  controls.appendChild(optionalToggle);
  controls.appendChild(removeButton);
  
  container.appendChild(label);
  container.appendChild(controls);
  
  return container;
}

// Toggle optional status of an activity
function toggleOptional(realityId) {
  if (optionalActivities.has(realityId)) {
    optionalActivities.delete(realityId);
  } else {
    optionalActivities.add(realityId);
  }
  
  // Save optional activities
  saveOptionalActivities();
  
  // Re-render to update UI
  renderPlannedRealities();
  setupDragAndDrop();
  setupMobileGestures();
  updateKeyboardAccessibility();
  
  // Recalculate timeline if it exists
  if (timelineData.length > 0 && arrivalTime) {
    calculateTimeline();
  }
}

function loadOptionalActivities() {
  const saved = localStorage.getItem('optionalActivities');
  if (saved) {
    try {
      optionalActivities = new Set(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load optional activities', e);
      optionalActivities = new Set();
    }
  }
}

function saveOptionalActivities() {
  localStorage.setItem('optionalActivities', JSON.stringify(Array.from(optionalActivities)));
}

// Category folder tab functionality
function loadExpandedCategories() {
  const saved = localStorage.getItem('expandedCategories');
  if (saved) {
    try {
      expandedCategories = new Set(JSON.parse(saved));
    } catch (e) {
      expandedCategories = new Set();
    }
  } else {
    // Default: all collapsed
    expandedCategories = new Set();
  }
}

function saveExpandedCategories() {
  localStorage.setItem('expandedCategories', JSON.stringify(Array.from(expandedCategories)));
}

function toggleCategory(categoryKey) {
  const categoryGroup = document.querySelector(`.reality-category[data-category="${categoryKey}"]`);
  if (!categoryGroup) return;
  
  const categoryItems = categoryGroup.querySelector('.category-items');
  const categoryHeader = categoryGroup.querySelector('.category-header');
  
  if (!categoryItems || !categoryHeader) return;
  
  const isExpanded = expandedCategories.has(categoryKey);
  
  if (isExpanded) {
    // Collapse - push tab back into slit
    expandedCategories.delete(categoryKey);
    categoryItems.style.display = 'none';
    categoryHeader.setAttribute('aria-expanded', 'false');
    categoryHeader.classList.remove('expanded-tab');
    categoryGroup.classList.remove('expanded');
  } else {
    // Expand - pull tab out of slit
    expandedCategories.add(categoryKey);
    categoryItems.style.display = 'flex';
    categoryHeader.setAttribute('aria-expanded', 'true');
    categoryHeader.classList.add('expanded-tab');
    categoryGroup.classList.add('expanded');
  }
  
  saveExpandedCategories();
}

function setupCategoryFolders() {
  // This is called after rendering, so categories are already set up
  // Just ensure visual state matches
  document.querySelectorAll('.reality-category').forEach(categoryGroup => {
    const categoryKey = categoryGroup.dataset.category;
    const categoryItems = categoryGroup.querySelector('.category-items');
    const categoryHeader = categoryGroup.querySelector('.category-header');
    
    if (categoryItems && categoryHeader) {
      const isExpanded = expandedCategories.has(categoryKey);
      categoryItems.style.display = isExpanded ? 'flex' : 'none';
      categoryHeader.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if (isExpanded) {
        categoryGroup.classList.add('expanded');
        categoryHeader.classList.add('expanded-tab');
      } else {
        categoryGroup.classList.remove('expanded');
        categoryHeader.classList.remove('expanded-tab');
      }
    }
  });
}

// Remove reality from plan
function removeFromPlan(realityId) {
  plannedRealities = plannedRealities.filter(id => id !== realityId);
  renderPlannedRealities();
  
  // Reset height to default if plan is now empty
  if (plannedRealities.length === 0) {
    const plannerPage = document.getElementById('planning-area');
    if (plannerPage) {
      plannerPage.style.removeProperty('height');
      plannerPage.style.removeProperty('max-height');
      plannerPage.style.setProperty('min-height', '400px', 'important');
      localStorage.removeItem('plannerPageHeight');
    }
  }
}

// Render add custom reality section
function renderAddCustom() {
  const availableSection = document.getElementById('available-realities');
  
  // Remove existing add-custom if it exists
  const existing = document.getElementById('add-custom');
  if (existing) {
    existing.remove();
  }
  
  const addCustomSection = document.createElement('div');
  addCustomSection.id = 'add-custom';
  addCustomSection.className = 'add-custom';
  
  const inputRow = document.createElement('div');
  inputRow.className = 'custom-input-row';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'custom-reality-input';
  input.placeholder = 'add something...';
  input.className = 'custom-input';
  
  const durationInput = document.createElement('input');
  durationInput.type = 'number';
  durationInput.id = 'custom-duration-input';
  durationInput.placeholder = 'min';
  durationInput.className = 'custom-duration-input';
  durationInput.min = 1;
  durationInput.max = 300;
  
  const addButton = document.createElement('button');
  addButton.textContent = 'add';
  addButton.className = 'add-button';
  addButton.addEventListener('click', handleAddCustom);
  
  // Also add on Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddCustom();
    }
  });
  durationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAddCustom();
    }
  });
  
  inputRow.appendChild(input);
  inputRow.appendChild(durationInput);
  addCustomSection.appendChild(inputRow);
  addCustomSection.appendChild(addButton);
  
  availableSection.appendChild(addCustomSection);
}

// Handle duration change
function handleDurationChange(realityId, newDuration) {
  const duration = parseInt(newDuration, 10);
  if (duration > 0 && duration <= 300) {
    const reality = realities.find(r => r.id === realityId);
    if (reality) {
      reality.duration = duration;
      // Save custom realities if this is a custom reality
      if (!presetRealityIds.has(realityId)) {
        saveCustomRealities();
      }
      // Don't auto-recalculate, user needs to click button again
    }
  }
}

// Handle adding custom reality
function handleAddCustom() {
  const input = document.getElementById('custom-reality-input');
  const durationInput = document.getElementById('custom-duration-input');
  
  const label = input.value.trim();
  const duration = parseInt(durationInput.value, 10);
  
  if (label && duration > 0 && duration <= 300) {
    const customId = `custom-${customRealityCounter++}`;
    const newReality = {
      id: customId,
      label: label,
      duration: duration,
      category: 'custom' // Custom realities get 'custom' category
    };
    
    realities.push(newReality);
    stageLabels[customId] = `start ${label}`;
    
    // Save custom realities to localStorage
    saveCustomRealities();
    
    input.value = '';
    durationInput.value = '';
    
    renderAvailableRealities();
    renderAddCustom();
    setupDragAndDrop();
  }
}

// Handle arrival time input
function handleArrivalTimeChange(event) {
  const timeValue = event.target.value;
  if (timeValue) {
    arrivalTime = parseTime(timeValue);
    // Don't auto-calculate, wait for button click
  } else {
    arrivalTime = null;
    clearTimeline();
    stopNotificationChecker();
  }
}

// Handle time format change
function handleTimeFormatChange(event) {
  timeFormat = event.target.value;
  localStorage.setItem('timeFormat', timeFormat);
  // Recalculate timeline if it exists to update display format
  if (timelineData.length > 0) {
    calculateTimeline();
  }
}

// Parse time string (HH:MM) to Date object (today) in local time
function parseTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  return date;
}

// Format time for display based on selected format (12-hour or 24-hour)
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  if (timeFormat === '24') {
    // 24-hour format: HH:MM
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else {
    // 12-hour format: h:MM AM/PM
    const hour12 = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
}

// Format time with seconds for display based on selected format (12-hour or 24-hour)
function formatTimeWithSeconds(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  if (timeFormat === '24') {
    // 24-hour format: HH:MM:SS
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    // 12-hour format: h:MM:SS AM/PM
    const hour12 = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${hour12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }
}

// Helper to compare times - both dates should be in same reference frame
// Since we're storing dates in local time, we can compare directly

// Calculate backwards timeline
function calculateTimeline() {
  if (!arrivalTime || plannedRealities.length === 0) {
    clearTimeline();
    return;
  }

  // Validate arrival time is in the future
  const now = new Date();
  const arrivalDate = new Date(arrivalTime);
  
  if (arrivalDate <= now) {
    showValidationError('arrival time must be in the future. please set a time later than now.');
    clearTimeline();
    return;
  }

  const timeline = [];
  let currentTime = new Date(arrivalTime);
  let totalDuration = 0;

  // Calculate total duration needed (excluding optional activities)
  let requiredDuration = 0;
  let optionalDuration = 0;
  
  for (const realityId of plannedRealities) {
    const reality = realities.find(r => r.id === realityId);
    if (reality) {
      if (optionalActivities.has(realityId)) {
        optionalDuration += reality.duration;
      } else {
        requiredDuration += reality.duration;
      }
      totalDuration += reality.duration;
    }
  }

  // Check if required activities fit before arrival time (optional activities don't count)
  const timeAvailable = arrivalDate.getTime() - now.getTime();
  const requiredTimeNeeded = requiredDuration * 60 * 1000;
  
  if (requiredTimeNeeded > timeAvailable) {
    const hoursOver = Math.floor((requiredTimeNeeded - timeAvailable) / (60 * 60 * 1000));
    const minutesOver = Math.floor(((requiredTimeNeeded - timeAvailable) % (60 * 60 * 1000)) / (60 * 1000));
    let overText = '';
    if (hoursOver > 0) {
      overText = `${hoursOver} hour${hoursOver !== 1 ? 's' : ''}`;
      if (minutesOver > 0) {
        overText += ` and ${minutesOver} minute${minutesOver !== 1 ? 's' : ''}`;
      }
    } else {
      overText = `${minutesOver} minute${minutesOver !== 1 ? 's' : ''}`;
    }
    
    // Calculate squeeze factor (how much to reduce durations)
    const squeezeFactor = timeAvailable / requiredTimeNeeded;
    
    showValidationWarningWithSqueeze(
      `your required activities need ${overText} more time than available. you can squeeze tasks in or mark some as optional using the ○ button on each task.`,
      requiredTimeNeeded,
      timeAvailable,
      squeezeFactor
    );
  } else if (optionalDuration > 0) {
    // Show info about optional activities
    const optionalHours = Math.floor(optionalDuration / 60);
    const optionalMinutes = optionalDuration % 60;
    let optionalText = '';
    if (optionalHours > 0) {
      optionalText = `${optionalHours}h`;
      if (optionalMinutes > 0) {
        optionalText += ` ${optionalMinutes}m`;
      }
    } else {
      optionalText = `${optionalMinutes}m`;
    }
    // Don't show as warning, just informational
  }

  // Add arrival point
  timeline.push({
    time: new Date(currentTime),
    label: 'be there'
  });

  // Process planned realities in reverse order (from arrival backwards)
  // plannedRealities array is in the order user wants (first = earliest)
  // So we reverse it to work backwards from arrival
  const reverseOrder = [...plannedRealities].reverse();
  
  for (const realityId of reverseOrder) {
    const reality = realities.find(r => r.id === realityId);
    if (reality) {
      // Subtract duration to get when this activity should be finished
      currentTime = new Date(currentTime.getTime() - reality.duration * 60000);
      
      // Use activity label as-is
      const activityLabel = reality.label;
      
      timeline.push({
        time: new Date(currentTime),
        label: activityLabel
      });
    }
  }

  // Check if start time is in the past
  const startTime = timeline[0]?.time;
  if (startTime && startTime < now) {
    showValidationWarning(
      `your plan starts at ${formatTime(startTime)}, which is in the past. ` +
      `you may want to adjust your arrival time or activities.`
    );
  }

  // Reverse timeline so earliest time is at top
  timeline.reverse();

  // Store timeline data for notifications
  timelineData = timeline;

  renderTimeline(timeline);
  startNotificationChecker();
  
  // Show summary if timeline is valid
  showTimelineSummary(timeline, totalDuration);
}

// Show validation error
function showValidationError(message) {
  const container = document.getElementById('notification-container');
  container.innerHTML = '';
  
  const notification = document.createElement('div');
  notification.className = 'notification notification-error';
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'notification-message';
  messageDiv.textContent = message;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'notification-close';
  closeButton.textContent = '×';
  closeButton.setAttribute('aria-label', 'close notification');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });
  
  notification.appendChild(messageDiv);
  notification.appendChild(closeButton);
  
  container.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 10000);
}

// Show validation warning
function showValidationWarning(message) {
  const container = document.getElementById('notification-container');
  
  // Don't replace existing notifications, add to them
  const notification = document.createElement('div');
  notification.className = 'notification notification-warning';
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'notification-message';
  messageDiv.textContent = message;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'notification-close';
  closeButton.textContent = '×';
  closeButton.setAttribute('aria-label', 'close notification');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });
  
  notification.appendChild(messageDiv);
  notification.appendChild(closeButton);
  
  container.appendChild(notification);
  
  // Auto-remove after 15 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 15000);
}

// Show validation warning with squeeze option
function showValidationWarningWithSqueeze(message, requiredTimeNeeded, timeAvailable, squeezeFactor) {
  const container = document.getElementById('notification-container');
  
  // Don't replace existing notifications, add to them
  const notification = document.createElement('div');
  notification.className = 'notification notification-warning';
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'notification-message';
  messageDiv.textContent = message;
  
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'notification-actions';
  
  const squeezeButton = document.createElement('button');
  squeezeButton.className = 'notification-action-button';
  squeezeButton.textContent = 'squeeze tasks in';
  squeezeButton.addEventListener('click', () => {
    squeezeTasksToFit(requiredTimeNeeded, timeAvailable, squeezeFactor);
    notification.remove();
  });
  
  actionsDiv.appendChild(squeezeButton);
  
  const closeButton = document.createElement('button');
  closeButton.className = 'notification-close';
  closeButton.textContent = '×';
  closeButton.setAttribute('aria-label', 'close notification');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });
  
  notification.appendChild(messageDiv);
  notification.appendChild(actionsDiv);
  notification.appendChild(closeButton);
  
  container.appendChild(notification);
  
  // Auto-remove after 20 seconds (longer since there's an action)
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 20000);
}

// Squeeze tasks to fit by reducing durations proportionally
function squeezeTasksToFit(requiredTimeNeeded, timeAvailable, squeezeFactor) {
  // Only adjust required (non-optional) activities
  plannedRealities.forEach(realityId => {
    if (!optionalActivities.has(realityId)) {
      const reality = realities.find(r => r.id === realityId);
      if (reality) {
        // Store original duration if not already stored
        if (!reality.originalDuration) {
          reality.originalDuration = reality.duration;
        }
        // Calculate new duration (minimum 1 minute)
        const newDuration = Math.max(1, Math.floor(reality.duration * squeezeFactor));
        reality.duration = newDuration;
      }
    }
  });
  
  // Re-render and recalculate timeline
  renderPlannedRealities();
  generateTimeline();
}

// Show timeline summary
function showTimelineSummary(timeline, totalDuration) {
  if (timeline.length === 0) return;
  
  const startTime = timeline[0].time;
  const now = new Date();
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  
  let durationText = '';
  if (hours > 0) {
    durationText = `${hours} hour${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) {
      durationText += ` ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  } else {
    durationText = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  
  // Calculate breakdown by category
  const categoryBreakdown = {};
  plannedRealities.forEach(realityId => {
    const reality = realities.find(r => r.id === realityId);
    if (reality) {
      const category = reality.category || 'other';
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = { count: 0, duration: 0 };
      }
      categoryBreakdown[category].count++;
      categoryBreakdown[category].duration += reality.duration;
    }
  });
  
  // Render timeline insights
  renderTimelineInsights({
    startTime: startTime,
    totalDuration: durationText,
    totalMinutes: totalDuration,
    activityCount: plannedRealities.length,
    categoryBreakdown: categoryBreakdown
  });
}

// Render timeline insights/analytics
function renderTimelineInsights(summary) {
  const timelineSection = document.getElementById('timeline');
  if (!timelineSection) return;
  
  // Remove existing insights if any
  const existingInsights = timelineSection.querySelector('.timeline-insights');
  if (existingInsights) {
    existingInsights.remove();
  }
  
  const insightsDiv = document.createElement('div');
  insightsDiv.className = 'timeline-insights';
  
  const insightsTitle = document.createElement('h4');
  insightsTitle.className = 'insights-title';
  insightsTitle.textContent = 'timeline summary';
  
  const insightsGrid = document.createElement('div');
  insightsGrid.className = 'insights-grid';
  
  // Start time
  const startCard = document.createElement('div');
  startCard.className = 'insight-card';
  const startLabel = document.createElement('div');
  startLabel.className = 'insight-label';
  startLabel.textContent = 'start getting ready';
  const startValue = document.createElement('div');
  startValue.className = 'insight-value';
  startValue.textContent = formatTime(summary.startTime);
  startCard.appendChild(startLabel);
  startCard.appendChild(startValue);
  
  // Total duration
  const durationCard = document.createElement('div');
  durationCard.className = 'insight-card';
  const durationLabel = document.createElement('div');
  durationLabel.className = 'insight-label';
  durationLabel.textContent = 'total prep time';
  const durationValue = document.createElement('div');
  durationValue.className = 'insight-value';
  durationValue.textContent = summary.totalDuration;
  durationCard.appendChild(durationLabel);
  durationCard.appendChild(durationValue);
  
  // Activity count
  const countCard = document.createElement('div');
  countCard.className = 'insight-card';
  const countLabel = document.createElement('div');
  countLabel.className = 'insight-label';
  countLabel.textContent = 'activities';
  const countValue = document.createElement('div');
  countValue.className = 'insight-value';
  countValue.textContent = `${summary.activityCount}`;
  countCard.appendChild(countLabel);
  countCard.appendChild(countValue);
  
  insightsGrid.appendChild(startCard);
  insightsGrid.appendChild(durationCard);
  insightsGrid.appendChild(countCard);
  
  // Category breakdown
  if (Object.keys(summary.categoryBreakdown).length > 0) {
    const breakdownTitle = document.createElement('h4');
    breakdownTitle.className = 'breakdown-title';
    breakdownTitle.textContent = 'by category';
    
    const breakdownList = document.createElement('div');
    breakdownList.className = 'breakdown-list';
    
    const categoryLabels = {
      'getting-ready': 'getting ready',
      'meals': 'meals',
      'transit': 'transit',
      'rot': 'rot',
      'packing': 'packing',
      'custom': 'custom'
    };
    
    Object.keys(summary.categoryBreakdown).forEach(category => {
      const breakdown = summary.categoryBreakdown[category];
      const breakdownItem = document.createElement('div');
      breakdownItem.className = 'breakdown-item';
      
      const breakdownLabel = document.createElement('span');
      breakdownLabel.className = 'breakdown-label';
      breakdownLabel.textContent = categoryLabels[category] || category;
      
      const breakdownValue = document.createElement('span');
      breakdownValue.className = 'breakdown-value';
      const breakdownHours = Math.floor(breakdown.duration / 60);
      const breakdownMinutes = breakdown.duration % 60;
      let breakdownText = '';
      if (breakdownHours > 0) {
        breakdownText = `${breakdownHours}h`;
        if (breakdownMinutes > 0) {
          breakdownText += ` ${breakdownMinutes}m`;
        }
      } else {
        breakdownText = `${breakdownMinutes}m`;
      }
      breakdownValue.textContent = `${breakdown.count} items • ${breakdownText}`;
      
      breakdownItem.appendChild(breakdownLabel);
      breakdownItem.appendChild(breakdownValue);
      breakdownList.appendChild(breakdownItem);
    });
    
    insightsDiv.appendChild(breakdownTitle);
    insightsDiv.appendChild(breakdownList);
  }
  
  insightsDiv.appendChild(insightsTitle);
  insightsDiv.appendChild(insightsGrid);
  
  // Insert before timeline items
  const visualTimeline = timelineSection.querySelector('.visual-timeline-container');
  if (visualTimeline) {
    timelineSection.insertBefore(insightsDiv, visualTimeline);
  } else {
    timelineSection.appendChild(insightsDiv);
  }
}

// Render timeline with visual representation
function renderTimeline(timeline) {
  const timelineSection = document.getElementById('timeline');
  timelineSection.innerHTML = '';

  if (timeline.length === 0) {
    return;
  }

  // Add smooth reveal animation
  timelineSection.style.display = 'block';
  timelineSection.style.opacity = '0';
  timelineSection.style.transform = 'translateY(20px)';
  
  // Animate timeline section appearance
  requestAnimationFrame(() => {
    timelineSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    timelineSection.style.opacity = '1';
    timelineSection.style.transform = 'translateY(0)';
  });

  // Create visual timeline container
  const visualTimeline = document.createElement('div');
  visualTimeline.className = 'visual-timeline-container';
  
  // Create timeline line
  const timelineLine = document.createElement('div');
  timelineLine.className = 'timeline-line';
  
  // Calculate total time span
  const startTime = timeline[0].time;
  const endTime = timeline[timeline.length - 1].time; // This is "be there"
  const totalDuration = endTime.getTime() - startTime.getTime();
  const now = new Date();
  
  visualTimeline.appendChild(timelineLine);
  
  // After all items are rendered, set the line height to match the "be there" position
  // We'll do this after the items container is populated

  // Create items container
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'timeline-items-container';

  // Determine which task should be active based on current time
  let currentTaskIndex = -1;
  for (let i = 0; i < timeline.length; i++) {
    const item = timeline[i];
    const timeDiff = item.time.getTime() - now.getTime();
    if (timeDiff >= 0) {
      // This is the next upcoming task or current task
      currentTaskIndex = i;
      break;
    }
  }
  // If all tasks are in the past, use the last one
  if (currentTaskIndex === -1) {
    currentTaskIndex = timeline.length - 1;
  }

  // Store references to first and last item wrappers for dot positioning
  let firstItemWrapper = null;
  let lastItemWrapper = null;
  
  timeline.forEach((item, index) => {
    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'timeline-item-wrapper';
    itemWrapper.setAttribute('data-item-index', index);
    
    const isFirst = index === 0;
    const isLast = index === timeline.length - 1;
    
    if (isFirst) {
      firstItemWrapper = itemWrapper;
    }
    if (isLast) {
      lastItemWrapper = itemWrapper;
    }
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'timeline-item';
    if (item.optional) {
      itemDiv.classList.add('optional-timeline-item');
    }
    itemDiv.style.opacity = '0';
    itemDiv.style.transform = 'translateY(10px)';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = item.label;
    if (item.optional) {
      const optionalBadge = document.createElement('span');
      optionalBadge.className = 'optional-badge';
      optionalBadge.textContent = 'optional';
      labelSpan.appendChild(optionalBadge);
    }
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    // "be there" doesn't need "done", everything else does
    const timePrefix = item.label === 'be there' ? 'by' : 'done by';
    timeSpan.textContent = `${timePrefix} ${formatTime(item.time)}`;
    
    itemDiv.appendChild(labelSpan);
    itemDiv.appendChild(timeSpan);
    itemWrapper.appendChild(itemDiv);
    itemsContainer.appendChild(itemWrapper);
    
    // Stagger animation for each item
    setTimeout(() => {
      itemDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      itemDiv.style.opacity = '1';
      itemDiv.style.transform = 'translateY(0)';
    }, index * 50);
  });
  
  // After items are rendered, position dots at the center of first and last items
  setTimeout(() => {
    if (firstItemWrapper) {
      const firstDot = document.createElement('div');
      firstDot.className = 'timeline-dot start-dot';
      const firstRect = firstItemWrapper.getBoundingClientRect();
      const containerRect = itemsContainer.getBoundingClientRect();
      const firstCenter = firstRect.top - containerRect.top + (firstRect.height / 2);
      firstDot.style.top = `${firstCenter}px`;
      timelineLine.appendChild(firstDot);
    }
    
    if (lastItemWrapper) {
      const lastDot = document.createElement('div');
      lastDot.className = 'timeline-dot end-dot';
      const lastRect = lastItemWrapper.getBoundingClientRect();
      const containerRect = itemsContainer.getBoundingClientRect();
      const lastCenter = lastRect.top - containerRect.top + (lastRect.height / 2);
      lastDot.style.top = `${lastCenter}px`;
      timelineLine.appendChild(lastDot);
    }
  }, 200);
  
  // Create current task indicator dot (moves to show which task you should be at)
  const currentTaskIndicator = document.createElement('div');
  currentTaskIndicator.className = 'timeline-current-task-indicator';
  currentTaskIndicator.style.display = 'none'; // Will be positioned after items render
  timelineLine.appendChild(currentTaskIndicator);
  
  // Position current task indicator after items are rendered
  setTimeout(() => {
    if (currentTaskIndex >= 0 && currentTaskIndex < timeline.length) {
      const itemWrappers = itemsContainer.querySelectorAll('.timeline-item-wrapper');
      if (itemWrappers[currentTaskIndex]) {
        const itemWrapper = itemWrappers[currentTaskIndex];
        const itemRect = itemWrapper.getBoundingClientRect();
        const containerRect = itemsContainer.getBoundingClientRect();
        const itemCenter = itemRect.top - containerRect.top + (itemRect.height / 2);
        currentTaskIndicator.style.top = `${itemCenter}px`;
        currentTaskIndicator.style.display = 'block';
      }
    }
  }, 200);
  
  visualTimeline.appendChild(itemsContainer);
  timelineSection.appendChild(visualTimeline);
  
  // Set timeline line height to match the items container height
  // Wait for items to render, then set line height
  setTimeout(() => {
    const itemsContainerHeight = itemsContainer.offsetHeight;
    if (itemsContainerHeight > 0) {
      timelineLine.style.height = `${itemsContainerHeight}px`;
    } else {
      // Fallback: use percentage based on "be there" position
      const beThereTime = endTime;
      const beTherePositionPercent = ((beThereTime.getTime() - startTime.getTime()) / totalDuration) * 100;
      timelineLine.style.height = `${beTherePositionPercent}%`;
    }
    
    // Update dot positions after line height is set
    if (firstItemWrapper) {
      const firstRect = firstItemWrapper.getBoundingClientRect();
      const containerRect = itemsContainer.getBoundingClientRect();
      const firstCenter = firstRect.top - containerRect.top + (firstRect.height / 2);
      const firstDot = timelineLine.querySelector('.start-dot');
      if (firstDot) {
        firstDot.style.top = `${firstCenter}px`;
      }
    }
    if (lastItemWrapper) {
      const lastRect = lastItemWrapper.getBoundingClientRect();
      const containerRect = itemsContainer.getBoundingClientRect();
      const lastCenter = lastRect.top - containerRect.top + (lastRect.height / 2);
      const lastDot = timelineLine.querySelector('.end-dot');
      if (lastDot) {
        lastDot.style.top = `${lastCenter}px`;
      }
    }
    
    // Update current task indicator position
    updateCurrentTaskIndicator();
  }, 200);
  
  // Update current task indicator smoothly based on time progression
  const updateCurrentTaskIndicator = () => {
    const now = new Date();
    
    // Check if current time is within the timeline range
    if (now < startTime) {
      // Before timeline starts - position at first task
      const itemWrappers = itemsContainer.querySelectorAll('.timeline-item-wrapper');
      if (itemWrappers[0]) {
        const itemWrapper = itemWrappers[0];
        const itemRect = itemWrapper.getBoundingClientRect();
        const containerRect = itemsContainer.getBoundingClientRect();
        const itemCenter = itemRect.top - containerRect.top + (itemRect.height / 2);
        currentTaskIndicator.style.top = `${itemCenter}px`;
        currentTaskIndicator.style.display = 'block';
      }
      return;
    }
    
    if (now > endTime) {
      // After timeline ends - position at last task
      const itemWrappers = itemsContainer.querySelectorAll('.timeline-item-wrapper');
      if (itemWrappers[timeline.length - 1]) {
        const itemWrapper = itemWrappers[timeline.length - 1];
        const itemRect = itemWrapper.getBoundingClientRect();
        const containerRect = itemsContainer.getBoundingClientRect();
        const itemCenter = itemRect.top - containerRect.top + (itemRect.height / 2);
        currentTaskIndicator.style.top = `${itemCenter}px`;
        currentTaskIndicator.style.display = 'block';
      }
      return;
    }
    
    // Find which two tasks we're between
    let prevTaskIndex = -1;
    let nextTaskIndex = -1;
    
    for (let i = 0; i < timeline.length; i++) {
      const item = timeline[i];
      const timeDiff = item.time.getTime() - now.getTime();
      if (timeDiff >= 0) {
        nextTaskIndex = i;
        prevTaskIndex = i > 0 ? i - 1 : 0;
        break;
      }
    }
    
    // If we're past all tasks, use the last one
    if (nextTaskIndex === -1) {
      prevTaskIndex = timeline.length - 1;
      nextTaskIndex = timeline.length - 1;
    }
    
    const itemWrappers = itemsContainer.querySelectorAll('.timeline-item-wrapper');
    
    if (prevTaskIndex >= 0 && nextTaskIndex >= 0 && prevTaskIndex < itemWrappers.length && nextTaskIndex < itemWrappers.length) {
      const prevItem = timeline[prevTaskIndex];
      const nextItem = timeline[nextTaskIndex];
      const prevWrapper = itemWrappers[prevTaskIndex];
      const nextWrapper = itemWrappers[nextTaskIndex];
      
      // Calculate interpolation factor based on time
      let interpolationFactor = 0;
      if (prevTaskIndex === nextTaskIndex) {
        // Same task - position at its center
        interpolationFactor = 0.5;
      } else {
        const timeRange = nextItem.time.getTime() - prevItem.time.getTime();
        const timeProgress = now.getTime() - prevItem.time.getTime();
        interpolationFactor = timeRange > 0 ? timeProgress / timeRange : 0;
        // Clamp between 0 and 1
        interpolationFactor = Math.max(0, Math.min(1, interpolationFactor));
      }
      
      // Get positions of both tasks
      const prevRect = prevWrapper.getBoundingClientRect();
      const nextRect = nextWrapper.getBoundingClientRect();
      const containerRect = itemsContainer.getBoundingClientRect();
      
      const prevCenter = prevRect.top - containerRect.top + (prevRect.height / 2);
      const nextCenter = nextRect.top - containerRect.top + (nextRect.height / 2);
      
      // Interpolate between the two positions
      const interpolatedPosition = prevCenter + (nextCenter - prevCenter) * interpolationFactor;
      
      currentTaskIndicator.style.top = `${interpolatedPosition}px`;
      currentTaskIndicator.style.display = 'block';
    } else {
      currentTaskIndicator.style.display = 'none';
    }
  };
  
  // Update every second for smooth movement
  const currentTaskUpdateInterval = setInterval(updateCurrentTaskIndicator, 1000);
  
  // Store interval ID so we can clear it later
  if (!window.timelineIntervals) {
    window.timelineIntervals = [];
  }
  window.timelineIntervals.push(currentTaskUpdateInterval);
}

// Clear timeline
function clearTimeline() {
  const timelineSection = document.getElementById('timeline');
  timelineSection.innerHTML = '';
  timelineSection.style.display = 'none';
  timelineData = [];
  stopNotificationChecker();
}

// Setup drag and drop
function setupDragAndDrop() {
  // Available realities (sidebar)
  const availableItems = document.querySelectorAll('.available-reality-item');
  availableItems.forEach(item => {
    item.addEventListener('dragstart', handleAvailableDragStart);
    item.addEventListener('dragend', handleDragEnd);
  });
  
  // Planned realities (planning area)
  const plannedItems = document.querySelectorAll('.planned-reality-item');
  plannedItems.forEach(item => {
    item.addEventListener('dragstart', handlePlannedDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handlePlannedDrop);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
  });
  
  // Planning area drop zone
  const planningArea = document.getElementById('planned-realities');
  planningArea.addEventListener('dragover', handleDropZoneDragOver);
  planningArea.addEventListener('drop', handleDropZoneDrop);
  planningArea.addEventListener('dragenter', handleDropZoneDragEnter);
  planningArea.addEventListener('dragleave', handleDropZoneDragLeave);
}

let draggedElement = null;
let draggedRealityId = null;
let isFromAvailable = false;

function handleAvailableDragStart(e) {
  draggedElement = this;
  draggedRealityId = this.dataset.realityId;
  isFromAvailable = true;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handlePlannedDragStart(e) {
  draggedElement = this;
  draggedRealityId = this.dataset.realityId;
  isFromAvailable = false;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  // Prevent dragging when interacting with inputs
  const input = this.querySelector('.duration-input');
  if (input && (e.target === input || input.contains(e.target))) {
    e.preventDefault();
    return false;
  }
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  document.querySelectorAll('.planned-reality-item, .available-reality-item').forEach(item => {
    item.classList.remove('drag-over');
  });
  const dropZone = document.getElementById('planned-realities');
  if (dropZone) {
    dropZone.classList.remove('drag-over');
  }
  draggedElement = null;
  draggedRealityId = null;
  isFromAvailable = false;
  
  // Add subtle bounce animation when drop completes
  if (this.classList.contains('planned-reality-item')) {
    this.style.animation = 'none';
    requestAnimationFrame(() => {
      this.style.animation = 'fadeInScale 0.3s ease-out';
    });
  }
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (this !== draggedElement && this.classList.contains('planned-reality-item')) {
    this.classList.add('drag-over');
    // Add subtle scale effect
    this.style.transform = 'scale(1.05)';
  }
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
  // Reset transform
  if (this.classList.contains('planned-reality-item')) {
    this.style.transform = '';
  }
}

function handlePlannedDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  const targetId = this.dataset.realityId;
  
  if (isFromAvailable) {
    // Adding from available to planned
    if (!plannedRealities.includes(draggedRealityId)) {
      const targetIndex = plannedRealities.indexOf(targetId);
      plannedRealities.splice(targetIndex, 0, draggedRealityId);
      renderPlannedRealities();
      setupDragAndDrop();
    }
  } else {
    // Reordering within planned
    if (draggedRealityId !== targetId) {
      const draggedIndex = plannedRealities.indexOf(draggedRealityId);
      const targetIndex = plannedRealities.indexOf(targetId);
      
      plannedRealities.splice(draggedIndex, 1);
      plannedRealities.splice(targetIndex, 0, draggedRealityId);
      
      renderPlannedRealities();
      setupDragAndDrop();
    }
  }
  
  this.classList.remove('drag-over');
  return false;
}

function handleDropZoneDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDropZoneDragEnter(e) {
  if (isFromAvailable) {
    this.classList.add('drag-over');
  }
}

function handleDropZoneDragLeave(e) {
  // Only remove if we're actually leaving the drop zone
  if (!this.contains(e.relatedTarget)) {
    this.classList.remove('drag-over');
  }
}

function handleDropZoneDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  if (isFromAvailable && draggedRealityId) {
    // Add to end of planned realities
    if (!plannedRealities.includes(draggedRealityId)) {
      plannedRealities.push(draggedRealityId);
      renderPlannedRealities();
      setupDragAndDrop();
      
      // Add success feedback
      const dropZone = document.getElementById('planned-realities');
      dropZone.style.transform = 'scale(1.02)';
      setTimeout(() => {
        dropZone.style.transition = 'transform 0.3s ease';
        dropZone.style.transform = '';
      }, 100);
    }
  }
  
  this.classList.remove('drag-over');
  return false;
}

// Handle generate timeline button
function handleGenerateTimeline() {
  if (!arrivalTime) {
    showValidationError('please set an arrival time first.');
    return;
  }
  
  if (plannedRealities.length === 0) {
    showValidationError('please add at least one activity to your plan.');
    return;
  }
  
  // Validate arrival time format
  const arrivalDate = new Date(arrivalTime);
  if (isNaN(arrivalDate.getTime())) {
    showValidationError('invalid arrival time. please check your input.');
    return;
  }
  
  calculateTimeline();
  
  // Record plan usage in history
  recordPlanUsage();
}

// Record plan usage in history
function recordPlanUsage() {
  if (plannedRealities.length === 0 || !arrivalTime) return;
  
  const planSnapshot = {
    timestamp: new Date().toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    realities: plannedRealities.map(id => {
      const reality = realities.find(r => r.id === id);
      return {
        id: id,
        label: reality?.label || id,
        duration: reality?.duration || 0
      };
    }),
    totalDuration: plannedRealities.reduce((sum, id) => {
      const reality = realities.find(r => r.id === id);
      return sum + (reality?.duration || 0);
    }, 0)
  };
  
  // Load existing history
  loadPlanHistory();
  
  // Add to history (keep last 50 entries)
  planHistory.unshift(planSnapshot);
  if (planHistory.length > 50) {
    planHistory = planHistory.slice(0, 50);
  }
  
  // Save history
  savePlanHistory();
}

function loadPlanHistory() {
  const saved = localStorage.getItem('planHistory');
  if (saved) {
    try {
      planHistory = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load plan history', e);
      planHistory = [];
    }
  }
}

function savePlanHistory() {
  localStorage.setItem('planHistory', JSON.stringify(planHistory));
}

// Notification system
function startNotificationChecker() {
  stopNotificationChecker(); // Clear any existing interval
  
  // Check every 30 seconds
  notificationCheckInterval = setInterval(checkForNotifications, 30000);
  // Also check immediately
  checkForNotifications();
}

function stopNotificationChecker() {
  if (notificationCheckInterval) {
    clearInterval(notificationCheckInterval);
    notificationCheckInterval = null;
  }
}

function checkForNotifications() {
  if (timelineData.length === 0 || !notificationSettings.enabled) {
    return;
  }
  
  const now = new Date();
  const advanceWarningMs = notificationSettings.advanceWarning * 60 * 1000;
  
  // Find the next upcoming activity (within advance warning window)
  for (let i = timelineData.length - 1; i >= 0; i--) {
    const item = timelineData[i];
    
    // Compare times directly using Date objects (both in local time)
    const nowTime = now.getTime();
    const itemTime = item.time.getTime();
    const timeDiff = itemTime - nowTime;
    
    // If this activity is coming up within the advance warning window and hasn't passed
    if (timeDiff > 0 && timeDiff <= advanceWarningMs) {
      // Check if we've already shown a notification for this
      const lastNotification = localStorage.getItem('lastNotification');
      const notificationKey = `${item.label}_${item.time.getTime()}`;
      
      if (lastNotification !== notificationKey) {
        showNotification(item.label, item.time, timeDiff);
        localStorage.setItem('lastNotification', notificationKey);
        // Clear after 10 minutes
        setTimeout(() => {
          localStorage.removeItem('lastNotification');
        }, 10 * 60 * 1000);
      }
      break;
    }
  }
}

function showNotification(message, targetTime, timeUntilMs = null) {
  const container = document.getElementById('notification-container');
  
  // Calculate time until activity
  let timeText = `by ${formatTime(targetTime)}`;
  if (timeUntilMs !== null) {
    const minutesUntil = Math.floor(timeUntilMs / 60000);
    if (minutesUntil > 0) {
      timeText = `in ${minutesUntil} minute${minutesUntil !== 1 ? 's' : ''}`;
    } else {
      const secondsUntil = Math.floor(timeUntilMs / 1000);
      timeText = `in ${secondsUntil} second${secondsUntil !== 1 ? 's' : ''}`;
    }
  }
  
  // Play sound if enabled
  if (notificationSettings.soundEnabled) {
    playNotificationSound();
  }
  
  // Show browser notification if enabled and permission granted
  if (notificationSettings.useBrowserNotifications && 
      notificationPermission === 'granted' && 
      'Notification' in window) {
    try {
      const browserNotification = new Notification('it starts earlier', {
        body: `${message} ${timeText}`,
        icon: '/favicon.ico', // You may want to add a favicon
        tag: 'timeline-notification',
        requireInteraction: false
      });
      
      // Auto-close browser notification after 5 seconds
      setTimeout(() => {
        browserNotification.close();
      }, 5000);
      
      // Handle click on browser notification
      browserNotification.onclick = () => {
        window.focus();
        browserNotification.close();
      };
    } catch (error) {
      console.error('Failed to show browser notification:', error);
      // Fallback to in-page notification
    }
  }
  
  // Always show in-page notification as fallback/backup
  container.innerHTML = '';
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'notification-message';
  messageDiv.textContent = message;
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'notification-time';
  timeDiv.textContent = timeText;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'notification-close';
  closeButton.textContent = '×';
  closeButton.setAttribute('aria-label', 'close notification');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });
  
  notification.appendChild(messageDiv);
  notification.appendChild(timeDiv);
  notification.appendChild(closeButton);
  
  container.appendChild(notification);
  
  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 30000);
}

// Custom realities functionality
function loadCustomRealities() {
  // Load custom reality counter
  const savedCounter = localStorage.getItem('customRealityCounter');
  if (savedCounter) {
    customRealityCounter = parseInt(savedCounter, 10) || 0;
  }
  
  // Load custom realities
  const saved = localStorage.getItem('customRealities');
  if (saved) {
    try {
      const customRealities = JSON.parse(saved);
      // Add custom realities to the realities array
      customRealities.forEach(reality => {
        // Only add if it doesn't already exist (avoid duplicates)
        if (!realities.find(r => r.id === reality.id)) {
          realities.push(reality);
          // Also add to stageLabels if not present
          if (!stageLabels[reality.id]) {
            stageLabels[reality.id] = `start ${reality.label}`;
          }
        }
      });
    } catch (e) {
      console.error('Error loading custom realities:', e);
    }
  }
}

function saveCustomRealities() {
  // Get all custom realities (those not in presetRealityIds)
  const customRealities = realities.filter(r => !presetRealityIds.has(r.id));
  
  // Save custom realities and counter
  localStorage.setItem('customRealities', JSON.stringify(customRealities));
  localStorage.setItem('customRealityCounter', customRealityCounter.toString());
}

function deleteCustomReality(realityId) {
  // Don't allow deleting preset realities
  if (presetRealityIds.has(realityId)) {
    return;
  }
  
  if (confirm('delete this custom preset?')) {
    // Remove from realities array (only custom realities, never presets)
    // This should never happen for presets due to the check above, but double-check
    if (!presetRealityIds.has(realityId)) {
      realities = realities.filter(r => r.id !== realityId);
    } else {
      console.error('Attempted to delete a preset reality:', realityId);
      return;
    }
    
    // Remove from stageLabels
    delete stageLabels[realityId];
    
    // Remove from planned realities if it's there
    plannedRealities = plannedRealities.filter(id => id !== realityId);
    
    // Remove from saved plans (filter out references to this reality)
    savedPlans.forEach(plan => {
      plan.realities = plan.realities.filter(item => item.id !== realityId);
    });
    saveSavedPlans();
    
    // Save updated custom realities
    saveCustomRealities();
    
    // Re-render everything
    renderAvailableRealities();
    renderPlannedRealities();
    renderAddCustom();
    renderSavedPlans();
    setupDragAndDrop();
  }
}

// Saved plans functionality
function loadSavedPlans() {
  const saved = localStorage.getItem('savedPlans');
  if (saved) {
    try {
      savedPlans = JSON.parse(saved);
    } catch (e) {
      savedPlans = [];
    }
  } else {
    savedPlans = [];
  }
}

function saveSavedPlans() {
  localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
}

function saveCurrentPlan() {
  if (plannedRealities.length === 0) {
    alert('please add activities to your plan before saving.');
    return;
  }
  
  const planName = prompt('name this plan:');
  if (!planName || planName.trim() === '') {
    return;
  }
  
  // Save the plan with realities and their current durations
  const planData = {
    name: planName.trim(),
    realities: plannedRealities.map(id => {
      const reality = realities.find(r => r.id === id);
      return {
        id: id,
        duration: reality ? reality.duration : 0
      };
    }),
    createdAt: new Date().toISOString()
  };
  
  savedPlans.push(planData);
  saveSavedPlans();
  renderSavedPlans();
}

function loadSavedPlan(planIndex) {
  const plan = savedPlans[planIndex];
  if (!plan) return;
  
  // Clear current plan
  plannedRealities = [];
  
  // Load realities from saved plan
  plan.realities.forEach(item => {
    // Update duration if reality exists
    const reality = realities.find(r => r.id === item.id);
    if (reality) {
      reality.duration = item.duration;
      plannedRealities.push(item.id);
    }
  });
  
  renderPlannedRealities();
  renderAvailableRealities(); // Refresh to show updated durations
  setupDragAndDrop();
}

function deleteSavedPlan(planIndex) {
  if (confirm('delete this saved plan?')) {
    savedPlans.splice(planIndex, 1);
    saveSavedPlans();
    renderSavedPlans();
  }
}

// Render plan history
function renderPlanHistory() {
  const historyList = document.getElementById('plan-history-list');
  if (!historyList) return;
  
  loadPlanHistory();
  
  // Filter out plans where the arrival time has passed
  const now = new Date();
  planHistory = planHistory.filter(plan => {
    const arrivalDate = new Date(plan.arrivalTime);
    return arrivalDate > now;
  });
  savePlanHistory();
  
  historyList.innerHTML = '';
  
  // Update clear button visibility
  const clearButton = document.getElementById('clear-plan-history');
  if (clearButton) {
    clearButton.style.display = planHistory.length > 0 ? 'block' : 'none';
  }
  
  if (planHistory.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'plan-history-empty';
    emptyMsg.textContent = 'no recent plans';
    historyList.appendChild(emptyMsg);
    return;
  }
  
  // Show last 5 plans
  const recentPlans = planHistory.slice(0, 5);
  
  recentPlans.forEach((plan, index) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'plan-history-item';
    
    const historyTime = document.createElement('div');
    historyTime.className = 'plan-history-time';
    const planDate = new Date(plan.timestamp);
    const diffMs = now.getTime() - planDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    let timeText = '';
    if (diffMins < 1) {
      timeText = 'just now';
    } else if (diffMins < 60) {
      timeText = `${diffMins} min ago`;
    } else if (diffHours < 24) {
      timeText = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      timeText = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      timeText = planDate.toLocaleDateString();
    }
    historyTime.textContent = timeText;
    
    const historyDetails = document.createElement('div');
    historyDetails.className = 'plan-history-details';
    const arrivalDate = new Date(plan.arrivalTime);
    historyDetails.textContent = `${plan.realities.length} activities • ${formatTime(arrivalDate)}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'plan-history-delete';
    deleteButton.textContent = '×';
    deleteButton.setAttribute('aria-label', 'delete this plan');
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePlanFromHistory(index);
    });
    
    const useButton = document.createElement('button');
    useButton.className = 'plan-history-use-button';
    useButton.textContent = 'use';
    useButton.addEventListener('click', () => {
      loadPlanFromHistory(index);
    });
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'plan-history-buttons';
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(useButton);
    
    historyItem.appendChild(historyTime);
    historyItem.appendChild(historyDetails);
    historyItem.appendChild(buttonContainer);
    
    historyList.appendChild(historyItem);
  });
}

function deletePlanFromHistory(historyIndex) {
  planHistory.splice(historyIndex, 1);
  savePlanHistory();
  renderPlanHistory();
}

function clearPlanHistory() {
  if (confirm('clear all recent plans?')) {
    planHistory = [];
    savePlanHistory();
    renderPlanHistory();
  }
}

function resetPlan() {
  if (confirm('reset your plan?')) {
    plannedRealities = [];
    clearTimeline();
    renderPlannedRealities();
    stopNotificationChecker();
  }
}

function loadPlanFromHistory(historyIndex) {
  const plan = planHistory[historyIndex];
  if (!plan) return;
  
  // Clear current plan
  plannedRealities = [];
  
  // Set arrival time
  const arrivalDate = new Date(plan.arrivalTime);
  const hours = arrivalDate.getHours().toString().padStart(2, '0');
  const minutes = arrivalDate.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  
  const arrivalInput = document.getElementById('arrivalTime');
  if (arrivalInput) {
    arrivalInput.value = timeString;
    arrivalTime = parseTime(timeString);
  }
  
  // Load realities
  plan.realities.forEach(item => {
    // Update duration if reality exists
    const reality = realities.find(r => r.id === item.id);
    if (reality) {
      if (item.duration && item.duration !== reality.duration) {
        reality.duration = item.duration;
      }
      plannedRealities.push(item.id);
    }
  });
  
  renderPlannedRealities();
  renderAvailableRealities(); // Refresh to show updated durations
  setupDragAndDrop();
  setupMobileGestures();
  updateKeyboardAccessibility();
  
  // Show feedback
  showNotification(`loaded plan from ${new Date(plan.timestamp).toLocaleTimeString()}`, new Date());
}

function renderSavedPlans() {
  const savedPlansList = document.getElementById('saved-plans-list');
  if (!savedPlansList) return;
  
  savedPlansList.innerHTML = '';
  
  if (savedPlans.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'saved-plans-empty';
    emptyMsg.textContent = 'no saved plans yet';
    savedPlansList.appendChild(emptyMsg);
    return;
  }
  
  savedPlans.forEach((plan, index) => {
    const planItem = document.createElement('div');
    planItem.className = 'saved-plan-item';
    
    const planName = document.createElement('span');
    planName.className = 'saved-plan-name';
    planName.textContent = plan.name;
    planName.addEventListener('click', () => loadSavedPlan(index));
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'saved-plan-delete';
    deleteButton.textContent = '×';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteSavedPlan(index);
    });
    
    planItem.appendChild(planName);
    planItem.appendChild(deleteButton);
    savedPlansList.appendChild(planItem);
  });
}

// Setup event listeners
// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

function setupEventListeners() {
  const arrivalInput = document.getElementById('arrivalTime');
  arrivalInput.addEventListener('change', handleArrivalTimeChange);
  arrivalInput.addEventListener('input', handleArrivalTimeChange);
  
  const timeFormatSelect = document.getElementById('time-format');
  if (timeFormatSelect) {
    timeFormatSelect.addEventListener('change', handleTimeFormatChange);
  }
  
  const generateButton = document.getElementById('generate-timeline');
  if (generateButton) {
    addRippleEffect(generateButton);
    generateButton.addEventListener('click', handleGenerateTimeline);
  }
  
  const savePlanButton = document.getElementById('save-current-plan');
  if (savePlanButton) {
    addRippleEffect(savePlanButton);
    savePlanButton.addEventListener('click', saveCurrentPlan);
  }
  
  // Add ripple effects to all buttons
  document.querySelectorAll('button').forEach(button => {
    if (!button.classList.contains('ripple-added')) {
      addRippleEffect(button);
      button.classList.add('ripple-added');
    }
  });
  
  const themeSelector = document.getElementById('theme-selector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
  }
  
  // Setup notification settings
  setupNotificationSettings();
  
  // Setup keyboard accessibility
  setupKeyboardAccessibility();
  
  // Setup plan history clear button
  const clearPlanHistoryButton = document.getElementById('clear-plan-history');
  if (clearPlanHistoryButton) {
    clearPlanHistoryButton.addEventListener('click', clearPlanHistory);
  }
  
  // Setup plan history section hover
  const planHistorySection = document.getElementById('plan-history-section');
  if (planHistorySection) {
    const clearButton = document.getElementById('clear-plan-history');
    planHistorySection.addEventListener('mouseenter', () => {
      if (planHistory.length > 0 && clearButton) {
        clearButton.style.display = 'block';
      }
    });
    planHistorySection.addEventListener('mouseleave', () => {
      if (clearButton) {
        clearButton.style.display = 'none';
      }
    });
  }
  
  // Setup reset plan button
  const resetPlanButton = document.getElementById('reset-plan');
  if (resetPlanButton) {
    resetPlanButton.addEventListener('click', resetPlan);
  }
  
  // Setup plan section hover to show reset button
  const planSection = document.querySelector('.main-content');
  if (planSection) {
    const resetButton = document.getElementById('reset-plan');
    planSection.addEventListener('mouseenter', () => {
      if (plannedRealities.length > 0 && resetButton) {
        resetButton.style.display = 'block';
      }
    });
    planSection.addEventListener('mouseleave', () => {
      if (resetButton) {
        resetButton.style.display = 'none';
      }
    });
  }
}

// Notification settings UI
function setupNotificationSettings() {
  const toggle = document.getElementById('notification-settings-toggle');
  const panel = document.getElementById('notification-settings-panel');
  const advanceWarningSelect = document.getElementById('advance-warning');
  const soundCheckbox = document.getElementById('sound-enabled');
  const permissionButton = document.getElementById('request-notification-permission');
  
  if (!toggle || !panel) return;
  
  if (advanceWarningSelect) {
    advanceWarningSelect.value = notificationSettings.advanceWarning.toString();
    advanceWarningSelect.addEventListener('change', (e) => {
      notificationSettings.advanceWarning = parseInt(e.target.value, 10);
      saveNotificationSettings();
    });
  }
  
  if (soundCheckbox) {
    soundCheckbox.checked = notificationSettings.soundEnabled;
    soundCheckbox.addEventListener('change', (e) => {
      notificationSettings.soundEnabled = e.target.checked;
      saveNotificationSettings();
    });
  }
  
  // Toggle panel
  toggle.addEventListener('click', () => {
    const isVisible = panel.style.display !== 'none';
    panel.style.display = isVisible ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', (!isVisible).toString());
  });
  
  // Notifications toggle button (controls both general notifications and browser notifications)
  if (permissionButton) {
    // Update button text based on current state
    updateNotificationPermissionUI();
    
    permissionButton.addEventListener('click', () => {
      // Check current enabled state
      const currentlyEnabled = notificationSettings.enabled && notificationSettings.useBrowserNotifications;
      
      if (currentlyEnabled) {
        // Disable notifications
        notificationSettings.enabled = false;
        notificationSettings.useBrowserNotifications = false;
        saveNotificationSettings();
        stopNotificationChecker();
        updateNotificationPermissionUI();
      } else {
        // Enable notifications (request permission if needed)
        notificationSettings.enabled = true;
        saveNotificationSettings();
        
        if (timelineData.length > 0) {
          startNotificationChecker();
        }
        
        if (Notification.permission !== 'granted') {
          requestNotificationPermission().then(permission => {
            if (permission === 'granted') {
              notificationSettings.useBrowserNotifications = true;
              saveNotificationSettings();
            } else {
              // Permission denied, keep enabled=false
              notificationSettings.enabled = false;
              saveNotificationSettings();
            }
            updateNotificationPermissionUI();
          });
        } else {
          notificationSettings.useBrowserNotifications = true;
          saveNotificationSettings();
          updateNotificationPermissionUI();
        }
      }
    });
  }
}

function updateNotificationPermissionUI() {
  const permissionButton = document.getElementById('request-notification-permission');
  
  if (!permissionButton) return;
  
  // Check if notifications are enabled (both general and browser)
  const isEnabled = notificationSettings.enabled && notificationSettings.useBrowserNotifications;
  
  if (checkNotificationSupport()) {
    if (Notification.permission === 'granted') {
      notificationPermission = 'granted';
      // Show disable if enabled, enable if disabled
      permissionButton.textContent = isEnabled ? 'disable' : 'enable';
      permissionButton.disabled = false;
    } else if (Notification.permission === 'denied') {
      notificationPermission = 'denied';
      notificationSettings.enabled = false;
      notificationSettings.useBrowserNotifications = false;
      saveNotificationSettings();
      permissionButton.textContent = 'enable';
      permissionButton.disabled = true;
    } else {
      // Permission not yet requested or default
      notificationPermission = 'default';
      // Show disable if enabled, enable if disabled
      permissionButton.textContent = isEnabled ? 'disable' : 'enable';
      permissionButton.disabled = false;
    }
  } else {
    // Browser doesn't support notifications
    notificationSettings.enabled = false;
    notificationSettings.useBrowserNotifications = false;
    saveNotificationSettings();
    permissionButton.textContent = 'enable';
    permissionButton.disabled = true;
  }
}

// Play notification sound
function playNotificationSound() {
  // Create a simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.error('Failed to play notification sound:', error);
  }
}

// Keyboard accessibility
let focusedElementIndex = -1;
let focusedSection = null; // 'available', 'planned', 'timeline'

function setupKeyboardAccessibility() {
  // Global keyboard shortcuts
  document.addEventListener('keydown', handleGlobalKeyboard);
  
  // Focus management for available items
  const availableItems = document.querySelectorAll('.available-reality-item');
  availableItems.forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `${item.querySelector('.reality-label')?.textContent || 'activity'} - press enter to add to plan, arrow keys to navigate`);
    
    item.addEventListener('keydown', (e) => {
      handleItemKeyboard(e, item, index, 'available');
    });
  });
  
  // Focus management for planned items
  const plannedItems = document.querySelectorAll('.planned-reality-item');
  plannedItems.forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    
    item.addEventListener('keydown', (e) => {
      handleItemKeyboard(e, item, index, 'planned');
    });
  });
  
  // Make buttons keyboard accessible
  document.querySelectorAll('button').forEach(button => {
    if (!button.hasAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
    }
  });
  
  // Make inputs keyboard accessible
  document.querySelectorAll('input, select').forEach(input => {
    input.setAttribute('tabindex', '0');
  });
}

function handleGlobalKeyboard(e) {
  // Escape key closes modals/overlays
  if (e.key === 'Escape') {
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay && overlay.style.display !== 'none') {
      closeOnboarding();
      return;
    }
    
    // Close any open notifications
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notif => {
      const closeBtn = notif.querySelector('.notification-close');
      if (closeBtn) closeBtn.click();
    });
  }
  
  // Ctrl/Cmd + K to focus search (if we add search later)
  // G to generate timeline
  if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
    e.preventDefault();
    const generateButton = document.getElementById('generate-timeline');
    if (generateButton) {
      generateButton.focus();
      generateButton.click();
    }
  }
}

function handleItemKeyboard(e, item, index, section) {
  const items = section === 'available' 
    ? Array.from(document.querySelectorAll('.available-reality-item'))
    : Array.from(document.querySelectorAll('.planned-reality-item'));
  
  let newIndex = index;
  
  switch(e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (section === 'available') {
        // Add to plan
        const realityId = item.dataset.realityId;
        if (realityId && !plannedRealities.includes(realityId)) {
          plannedRealities.push(realityId);
          renderPlannedRealities();
          setupDragAndDrop();
          setupKeyboardAccessibility(); // Re-setup for new items
          
          // Show feedback
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transform = '';
          }, 200);
        }
      } else if (section === 'planned') {
        // Remove from plan
        const realityId = item.dataset.realityId;
        if (realityId) {
          removeFromPlan(realityId);
        }
      }
      break;
      
    case 'ArrowDown':
      e.preventDefault();
      newIndex = Math.min(index + 1, items.length - 1);
      items[newIndex].focus();
      break;
      
    case 'ArrowUp':
      e.preventDefault();
      newIndex = Math.max(index - 1, 0);
      items[newIndex].focus();
      break;
      
    case 'ArrowRight':
      if (section === 'available') {
        e.preventDefault();
        // Move to planned section
        const plannedItems = document.querySelectorAll('.planned-reality-item');
        if (plannedItems.length > 0) {
          plannedItems[0].focus();
        }
      }
      break;
      
    case 'ArrowLeft':
      if (section === 'planned') {
        e.preventDefault();
        // Move to available section
        const availableItems = document.querySelectorAll('.available-reality-item');
        if (availableItems.length > 0) {
          availableItems[0].focus();
        }
      }
      break;
      
    case 'Delete':
    case 'Backspace':
      if (section === 'planned') {
        e.preventDefault();
        const realityId = item.dataset.realityId;
        if (realityId) {
          removeFromPlan(realityId);
          // Focus next item or previous if last
          const nextIndex = index < items.length - 1 ? index : index - 1;
          if (nextIndex >= 0) {
            setTimeout(() => {
              const newItems = document.querySelectorAll('.planned-reality-item');
              if (newItems[nextIndex]) {
                newItems[nextIndex].focus();
              }
            }, 100);
          }
        }
      }
      break;
  }
}

// Update keyboard accessibility when items are re-rendered
function updateKeyboardAccessibility() {
  // Remove old event listeners by cloning and replacing
  const availableSection = document.getElementById('available-realities');
  const plannedSection = document.getElementById('planned-realities');
  
  // Re-setup keyboard accessibility
  setupKeyboardAccessibility();
}

// Setup corner fold resize functionality
function setupCornerFoldResize() {
  const cornerFold = document.getElementById('corner-fold');
  const plannerPage = document.getElementById('planning-area');
  
  if (!cornerFold || !plannerPage) return;
  
  // Load saved height only if there are planned realities
  const savedHeight = localStorage.getItem('plannerPageHeight');
  if (savedHeight && plannedRealities.length > 0) {
    const height = parseInt(savedHeight, 10);
    if (height >= 400 && height <= 2000) {
      plannerPage.style.setProperty('height', `${height}px`, 'important');
      plannerPage.style.setProperty('min-height', `${height}px`, 'important');
      plannerPage.style.setProperty('max-height', 'none', 'important');
    }
  } else {
    // Reset to default if no planned realities
    plannerPage.style.removeProperty('height');
    plannerPage.style.removeProperty('max-height');
    plannerPage.style.setProperty('min-height', '400px', 'important');
    localStorage.removeItem('plannerPageHeight');
  }
  
  let isResizing = false;
  let startY = 0;
  let startHeight = 0;
  
  // Mouse events for desktop
  cornerFold.addEventListener('mousedown', (e) => {
    isResizing = true;
    startY = e.clientY;
    startHeight = plannerPage.offsetHeight;
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    
    e.preventDefault();
    e.stopPropagation();
  });
  
  // Touch events for mobile/tablet
  cornerFold.addEventListener('touchstart', (e) => {
    isResizing = true;
    const touch = e.touches[0];
    startY = touch.clientY;
    startHeight = plannerPage.offsetHeight;
    
    document.addEventListener('touchmove', handleTouchResize, { passive: false });
    document.addEventListener('touchend', stopResize);
    
    e.preventDefault();
    e.stopPropagation();
  });
  
  function handleResize(e) {
    if (!isResizing) return;
    
    const diff = e.clientY - startY;
    const newHeight = startHeight + diff;
    
    // Constrain between 400px and 2000px
    const constrainedHeight = Math.max(400, Math.min(2000, newHeight));
    
    plannerPage.style.setProperty('height', `${constrainedHeight}px`, 'important');
    plannerPage.style.setProperty('min-height', `${constrainedHeight}px`, 'important');
    plannerPage.style.setProperty('max-height', 'none', 'important');
  }
  
  function handleTouchResize(e) {
    if (!isResizing) return;
    
    const touch = e.touches[0];
    const diff = touch.clientY - startY;
    const newHeight = startHeight + diff;
    
    // Constrain between 400px and 2000px
    const constrainedHeight = Math.max(400, Math.min(2000, newHeight));
    
    plannerPage.style.setProperty('height', `${constrainedHeight}px`, 'important');
    plannerPage.style.setProperty('min-height', `${constrainedHeight}px`, 'important');
    plannerPage.style.setProperty('max-height', 'none', 'important');
    
    e.preventDefault();
  }
  
  function stopResize(e) {
    if (isResizing) {
      isResizing = false;
      
      // Get the final height before saving
      const finalHeight = plannerPage.offsetHeight;
      
      // Always save the height when user resizes, regardless of planned realities
      // The check for planned realities only happens on page load (in init)
      plannerPage.style.setProperty('height', `${finalHeight}px`, 'important');
      plannerPage.style.setProperty('min-height', `${finalHeight}px`, 'important');
      plannerPage.style.setProperty('max-height', 'none', 'important');
      localStorage.setItem('plannerPageHeight', finalHeight.toString());
      
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
      document.removeEventListener('touchmove', handleTouchResize);
      document.removeEventListener('touchend', stopResize);
      
      if (e) {
        e.preventDefault();
      }
    }
  }
}

// Clock functionality
let clockStartTime = null;
let clockStartTimestamp = null;

function initClock() {
  // Use current system time
  const now = new Date();
  const currentHour = now.getHours() % 12; // Convert to 12-hour format
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  
  // Store the start time
  clockStartTime = {
    hour: currentHour,
    minute: currentMinute,
    second: currentSecond
  };
  
  // Store timestamp when clock started
  clockStartTimestamp = Date.now();
  
  // Set initial positions
  updateClock();
  
  // Update clock every second
  setInterval(updateClock, 1000);
}

function updateClock() {
  const hourHand = document.getElementById('hour-hand');
  const minuteHand = document.getElementById('minute-hand');
  const secondHand = document.getElementById('second-hand');
  const timeDisplay = document.getElementById('clock-time-display');
  
  if (!hourHand || !minuteHand || !secondHand || !clockStartTime || !clockStartTimestamp) return;
  
  // Calculate elapsed time in seconds since page load
  const elapsedMilliseconds = Date.now() - clockStartTimestamp;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  
  // Calculate current time based on start time + elapsed time
  let totalSeconds = clockStartTime.second + elapsedSeconds;
  let currentSecond = totalSeconds % 60;
  
  let totalMinutes = clockStartTime.minute + Math.floor(totalSeconds / 60);
  let currentMinute = totalMinutes % 60;
  
  let totalHours = clockStartTime.hour + Math.floor(totalMinutes / 60);
  let currentHour = totalHours % 12;
  
  // Update time display
  if (timeDisplay) {
    const now = new Date();
    // Format using the selected time format (12-hour or 24-hour)
    timeDisplay.textContent = formatTimeWithSeconds(now);
  }
  
  // Calculate rotation angles
  // Standard clock: 0° = 12 o'clock (pointing up), rotate clockwise
  // CSS: 0° = 3 o'clock (pointing right), so we need -90° offset to start at 12 o'clock
  // Hour hand: 30 degrees per hour + (minutes / 60) * 30 degrees
  const hourRotation = (currentHour * 30) + (currentMinute / 60) * 30;
  
  // Minute hand: 6 degrees per minute + (seconds / 60) * 6 degrees
  const minuteRotation = (currentMinute * 6) + (currentSecond / 60) * 6;
  
  // Second hand: 6 degrees per second
  const secondRotation = currentSecond * 6;
  
  // Apply rotations: -90° offset to start at 12 o'clock, then rotate clockwise
  // Ensure transform-origin is set via JavaScript to override any CSS conflicts
  hourHand.style.transformOrigin = '0% 50%';
  hourHand.style.transform = `rotate(${hourRotation - 90}deg)`;
  
  minuteHand.style.transformOrigin = '50% 0%';
  minuteHand.style.transform = `rotate(${minuteRotation - 90}deg)`;
  
  secondHand.style.transformOrigin = '50% 0%';
  secondHand.style.transform = `rotate(${secondRotation - 90}deg)`;
}

// Mobile reality selector
// Mobile gesture improvements
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let longPressTimer = null;
let draggedMobileItem = null;

function setupMobileGestures() {
  // Swipe to reorder for planned items on mobile
  const plannedItems = document.querySelectorAll('.planned-reality-item');
  
  plannedItems.forEach(item => {
    item.addEventListener('touchstart', handleTouchStart, { passive: false });
    item.addEventListener('touchmove', handleTouchMove, { passive: false });
    item.addEventListener('touchend', handleTouchEnd, { passive: false });
    item.addEventListener('touchcancel', handleTouchCancel, { passive: false });
  });
}

function handleTouchStart(e) {
  if (window.innerWidth > 1023) return; // Desktop, use drag and drop
  
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  touchStartTime = Date.now();
  draggedMobileItem = this;
  
  // Long press detection
  longPressTimer = setTimeout(() => {
    handleLongPress(this);
  }, 500);
  
  // Prevent scrolling while dragging
  this.style.touchAction = 'none';
}

function handleTouchMove(e) {
  if (!draggedMobileItem || window.innerWidth > 1023) return;
  
  const touch = e.touches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  
  // Cancel long press if moved
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  
  // If horizontal swipe is significant, prevent default scrolling
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
    e.preventDefault();
    
    // Visual feedback
    draggedMobileItem.style.transform = `translateX(${deltaX}px)`;
    draggedMobileItem.style.opacity = '0.7';
    
    // Find item to swap with
    const items = Array.from(document.querySelectorAll('.planned-reality-item'));
    const currentIndex = items.indexOf(draggedMobileItem);
    
    items.forEach((item, index) => {
      if (index !== currentIndex) {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        
        if (touch.clientX > rect.left && touch.clientX < rect.right) {
          item.style.transform = 'translateX(-10px)';
          item.style.transition = 'transform 0.2s ease';
        } else {
          item.style.transform = '';
        }
      }
    });
  }
}

function handleTouchEnd(e) {
  if (!draggedMobileItem || window.innerWidth > 1023) return;
  
  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  const deltaTime = Date.now() - touchStartTime;
  
  // Clear long press timer
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  
  // Reset styles
  draggedMobileItem.style.transform = '';
  draggedMobileItem.style.opacity = '';
  draggedMobileItem.style.touchAction = '';
  
  // Reset all items
  document.querySelectorAll('.planned-reality-item').forEach(item => {
    item.style.transform = '';
    item.style.transition = '';
  });
  
  // Handle swipe gesture (horizontal swipe > 50px)
  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && deltaTime < 300) {
    const items = Array.from(document.querySelectorAll('.planned-reality-item'));
    const currentIndex = items.indexOf(draggedMobileItem);
    const realityId = draggedMobileItem.dataset.realityId;
    
    if (deltaX > 0 && currentIndex < items.length - 1) {
      // Swipe right - move down
      const nextIndex = currentIndex + 1;
      const nextRealityId = items[nextIndex].dataset.realityId;
      swapRealities(realityId, nextRealityId);
    } else if (deltaX < 0 && currentIndex > 0) {
      // Swipe left - move up
      const prevIndex = currentIndex - 1;
      const prevRealityId = items[prevIndex].dataset.realityId;
      swapRealities(realityId, prevRealityId);
    }
  }
  
  // Handle tap (quick touch without movement)
  if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
    // Quick tap - could be used for quick actions later
  }
  
  draggedMobileItem = null;
}

function handleTouchCancel(e) {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  
  if (draggedMobileItem) {
    draggedMobileItem.style.transform = '';
    draggedMobileItem.style.opacity = '';
    draggedMobileItem.style.touchAction = '';
    draggedMobileItem = null;
  }
  
  document.querySelectorAll('.planned-reality-item').forEach(item => {
    item.style.transform = '';
    item.style.transition = '';
  });
}

function handleLongPress(item) {
  // Long press action - show quick menu or remove
  item.style.transform = 'scale(0.95)';
  
  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  
  // Could show a menu here, for now just visual feedback
  setTimeout(() => {
    item.style.transform = '';
  }, 200);
}

function swapRealities(id1, id2) {
  const index1 = plannedRealities.indexOf(id1);
  const index2 = plannedRealities.indexOf(id2);
  
  if (index1 !== -1 && index2 !== -1) {
    [plannedRealities[index1], plannedRealities[index2]] = [plannedRealities[index2], plannedRealities[index1]];
    renderPlannedRealities();
    setupDragAndDrop();
    setupMobileGestures();
    updateKeyboardAccessibility();
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  }
}

function setupMobileRealitySelector() {
  const mobileButton = document.getElementById('add-reality-mobile');
  if (!mobileButton) return;
  
  mobileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    createMobileRealitySelector();
  });
  
  // Close selector when clicking outside
  document.addEventListener('click', (e) => {
    const selector = document.getElementById('mobile-reality-selector');
    if (selector && selector.style.display === 'block' && !selector.contains(e.target) && e.target !== mobileButton) {
      selector.style.display = 'none';
    }
  });
}

function createMobileRealitySelector() {
  const planningArea = document.getElementById('planning-area');
  if (!planningArea) return;
  
  // Check if selector already exists
  let selector = document.getElementById('mobile-reality-selector');
  if (selector) {
    selector.style.display = selector.style.display === 'block' ? 'none' : 'block';
    return;
  }
  
  selector = document.createElement('div');
  selector.id = 'mobile-reality-selector';
  selector.className = 'mobile-reality-selector';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'mobile-selector-close';
  closeButton.textContent = '×';
  closeButton.addEventListener('click', () => {
    selector.style.display = 'none';
  });
  selector.appendChild(closeButton);
  
  const title = document.createElement('h3');
  title.textContent = 'choose a reality';
  selector.appendChild(title);
  
  // Group realities by category
  const categories = {
    'getting-ready': [],
    'meals': [],
    'transit': [],
    'rot': [],
    'packing': [],
    'custom': []
  };
  
  realities.forEach(reality => {
    const category = reality.category || 'custom';
    if (categories[category]) {
      categories[category].push(reality);
    }
  });
  
  const categoryOrder = ['getting-ready', 'meals', 'transit', 'rot', 'packing', 'custom'];
  const categoryLabels = {
    'rot': 'rot',
    'meals': 'meals',
    'getting-ready': 'getting ready',
    'packing': 'packing',
    'transit': 'transit / travel',
    'custom': 'custom'
  };
  
  categoryOrder.forEach(categoryKey => {
    const categoryRealities = categories[categoryKey];
    if (categoryRealities.length > 0) {
      const categoryGroup = document.createElement('div');
      categoryGroup.className = 'mobile-category-group';
      
      const categoryHeader = document.createElement('h4');
      categoryHeader.textContent = categoryLabels[categoryKey];
      categoryGroup.appendChild(categoryHeader);
      
      categoryRealities.forEach(reality => {
        const item = document.createElement('button');
        item.className = 'mobile-reality-item';
        item.textContent = reality.label;
        item.addEventListener('click', () => {
          if (!plannedRealities.includes(reality.id)) {
            plannedRealities.push(reality.id);
            renderPlannedRealities();
            setupDragAndDrop();
            selector.style.display = 'none';
          }
        });
        categoryGroup.appendChild(item);
      });
      
      selector.appendChild(categoryGroup);
    }
  });
  
  document.body.appendChild(selector);
  selector.style.display = 'block';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    initClock();
  });
} else {
  init();
  initClock();
}

// Onboarding system
const onboardingSlides = [
  {
    title: 'welcome',
    content: 'this is a realistic timeline planner that works backwards from when you need to arrive. no productivity jargon—just honest planning.'
  },
  {
    title: 'drag & drop',
    content: 'drag activities from the left sidebar into your plan area. reorder them by dragging within the plan area. each activity has a duration you can adjust.'
  },
  {
    title: 'set arrival time',
    content: 'enter when you need to be there at the top. choose 12-hour or 24-hour format. then click "let\'s go" to see your backwards timeline.'
  },
  {
    title: 'notifications',
    content: 'you\'ll get gentle reminders when it\'s time to start the next activity. enable browser notifications for alerts even when the tab is closed.'
  },
  {
    title: 'save & customize',
    content: 'save your plans for quick reuse. create custom activities. change themes. make it yours.'
  }
];

let currentOnboardingSlide = 0;

function checkAndShowOnboarding() {
  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
  if (!hasSeenOnboarding) {
    // Show onboarding after a short delay
    setTimeout(() => {
      showOnboarding();
    }, 500);
  }
}

function showOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  const slidesContainer = document.getElementById('onboarding-slides');
  const dotsContainer = document.querySelector('.onboarding-dots');
  
  if (!overlay || !slidesContainer) return;
  
  // Clear existing slides
  slidesContainer.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';
  
  // Create slides
  onboardingSlides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `onboarding-slide ${index === 0 ? 'active' : ''}`;
    
    const title = document.createElement('h3');
    title.textContent = slide.title;
    
    const content = document.createElement('p');
    content.innerHTML = slide.content;
    
    slideDiv.appendChild(title);
    slideDiv.appendChild(content);
    slidesContainer.appendChild(slideDiv);
    
    // Create dot
    if (dotsContainer) {
      const dot = document.createElement('div');
      dot.className = `onboarding-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    }
  });
  
  // Setup navigation
  const prevButton = document.getElementById('onboarding-prev');
  const nextButton = document.getElementById('onboarding-next');
  const closeButton = document.getElementById('onboarding-close');
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentOnboardingSlide > 0) {
        goToSlide(currentOnboardingSlide - 1);
      }
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (currentOnboardingSlide < onboardingSlides.length - 1) {
        goToSlide(currentOnboardingSlide + 1);
      } else {
        closeOnboarding();
      }
    });
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', closeOnboarding);
  }
  
  // Show overlay
  overlay.style.display = 'flex';
  currentOnboardingSlide = 0;
  updateNavigation();
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.onboarding-dot');
  const prevButton = document.getElementById('onboarding-prev');
  const nextButton = document.getElementById('onboarding-next');
  
  if (index < 0 || index >= slides.length) return;
  
  // Update slides
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentOnboardingSlide = index;
  updateNavigation();
}

function updateNavigation() {
  const prevButton = document.getElementById('onboarding-prev');
  const nextButton = document.getElementById('onboarding-next');
  
  if (prevButton) {
    prevButton.style.display = currentOnboardingSlide === 0 ? 'none' : 'block';
  }
  
  if (nextButton) {
    nextButton.textContent = currentOnboardingSlide === onboardingSlides.length - 1 ? 'get started' : 'next';
  }
}

function closeOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    localStorage.setItem('hasSeenOnboarding', 'true');
  }
}

// Credit section visibility
function initCreditSection() {
  const creditSection = document.querySelector('.credit-section');
  if (!creditSection) return;

  let showTimeout;
  let hideTimeout;

  function showCredit() {
    clearTimeout(hideTimeout);
    clearTimeout(showTimeout);
    showTimeout = setTimeout(() => {
      creditSection.classList.add('visible');
    }, 100);
  }

  function hideCredit() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      creditSection.classList.remove('visible');
    }, 200);
  }

  // Show when scrolling near bottom
  window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = documentHeight - scrollPosition;
    
    if (distanceFromBottom < 200) {
      showCredit();
    } else {
      hideCredit();
    }
  });

  // Show when hovering near bottom left corner
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Show if mouse is in bottom left quadrant
    if (mouseX < 200 && mouseY > windowHeight - 150) {
      showCredit();
    } else if (!creditSection.matches(':hover')) {
      hideCredit();
    }
  });

  // Keep visible when hovering over credit itself
  creditSection.addEventListener('mouseenter', showCredit);
  creditSection.addEventListener('mouseleave', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = documentHeight - scrollPosition;
    
    if (distanceFromBottom >= 200) {
      hideCredit();
    }
  });
}
