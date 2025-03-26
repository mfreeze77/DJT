/**
 * Date helper functions for working with the timeline
 */

// Define the date range for the visualization
// This will be dynamically adjusted based on the actual event dates
let DATE_RANGE = {
  start: new Date('1970-01-01'),
  end: new Date('2025-01-01')
};

// Store the sorted array of actual event dates
let EVENT_DATES = [];

/**
 * Set the date range and event dates array based on actual events
 * @param {Array} events - Array of event objects with date properties
 */
export function setDateRangeFromEvents(events) {
  if (!events || !events.length) return;
  
  try {
    // Filter events with valid dates
    const validEvents = events.filter(event => event && event.date);
    
    if (validEvents.length > 0) {
      // Create an array of all unique event dates
      const allDates = new Set();
      validEvents.forEach(event => {
        if (event.date) {
          allDates.add(new Date(event.date).toISOString().split('T')[0]);
        }
      });
      
      // Convert Set back to array of Date objects and sort
      EVENT_DATES = Array.from(allDates)
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => a.getTime() - b.getTime());
      
      // Set range based on the earliest and latest events
      DATE_RANGE.start = EVENT_DATES[0];
      DATE_RANGE.end = EVENT_DATES[EVENT_DATES.length - 1];
      
      console.log(`Set date range with ${EVENT_DATES.length} distinct event dates from`, 
        formatDate(DATE_RANGE.start), 'to', 
        formatDate(DATE_RANGE.end));
    }
  } catch (err) {
    console.error('Error setting date range from events:', err);
  }
}

/**
 * Calculate what percentage (0-100) a date is in our discrete event date array
 * @param {Date} date - Date to calculate position for
 * @returns {number} Percentage (0-100)
 */
export function dateToSliderPosition(date) {
  if (EVENT_DATES.length === 0) {
    // Fallback to continuous range if no event dates are available
    const totalRange = DATE_RANGE.end.getTime() - DATE_RANGE.start.getTime();
    const datePosition = date.getTime() - DATE_RANGE.start.getTime();
    return Math.round((datePosition / totalRange) * 100);
  }
  
  // Find the index of the closest event date
  const dateTime = date.getTime();
  let closestIndex = 0;
  let closestDiff = Math.abs(EVENT_DATES[0].getTime() - dateTime);
  
  for (let i = 1; i < EVENT_DATES.length; i++) {
    const diff = Math.abs(EVENT_DATES[i].getTime() - dateTime);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = i;
    }
  }
  
  // Convert index to percentage position on slider
  return Math.round((closestIndex / Math.max(1, EVENT_DATES.length - 1)) * 100);
}

/**
 * Convert a slider position (0-100) to the nearest event date
 * @param {number} position - Slider position (0-100)
 * @returns {Date} Corresponding date from the event dates array
 */
export function sliderPositionToDate(position) {
  if (EVENT_DATES.length === 0) {
    // Fallback to continuous range if no event dates are available
    const totalRange = DATE_RANGE.end.getTime() - DATE_RANGE.start.getTime();
    const datePosition = (position / 100) * totalRange;
    return new Date(DATE_RANGE.start.getTime() + datePosition);
  }
  
  // Convert percentage to index in the event dates array
  const index = Math.min(
    EVENT_DATES.length - 1,
    Math.round((position / 100) * (EVENT_DATES.length - 1))
  );
  
  return new Date(EVENT_DATES[index]);
}

/**
 * Format a date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculate opacity (0-1) based on date proximity
 * @param {Date} eventDate - Event date to calculate opacity for
 * @param {Date} selectedDate - Currently selected date
 * @param {number} maxDaysRange - Maximum days range for calculation
 * @returns {number} Opacity value from 0 to 1
 */
export function calculateDateProximityOpacity(eventDate, selectedDate, maxDaysRange = 365) {
  // Convert to timestamp for calculation
  const eventTime = new Date(eventDate).getTime();
  const selectedTime = new Date(selectedDate).getTime();
  
  // Calculate difference in days
  const diffTime = Math.abs(eventTime - selectedTime);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  // Calculate opacity (1 for exact match, decreasing to 0.1 for dates maxDaysRange away)
  if (diffDays <= 0) return 1;
  if (diffDays >= maxDaysRange) return 0.1;
  
  // Linear interpolation between 1 and 0.1
  return 1 - (diffDays / maxDaysRange) * 0.9;
}

/**
 * Get opacity class name based on calculated opacity
 * @param {number} opacity - Calculated opacity (0-1)
 * @returns {string} CSS class name
 */
export function getOpacityClass(opacity) {
  // Round to nearest 10%
  const opacityPercent = Math.round(opacity * 10) * 10;
  return `node-opacity-${opacityPercent}`;
}

/**
 * Move to the next event date
 * @param {Date} date - Current date
 * @returns {Date} Next event date
 */
export function moveDateByDays(date, days) {
  if (EVENT_DATES.length === 0) {
    // Fallback to regular day movement if no event dates
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (days > 0 ? 1 : -1));
    return newDate;
  }
  
  // Find the current position in the event dates array
  const currentTime = date.getTime();
  let currentIndex = 0;
  
  // Find closest current position
  for (let i = 0; i < EVENT_DATES.length; i++) {
    if (Math.abs(EVENT_DATES[i].getTime() - currentTime) < 
        Math.abs(EVENT_DATES[currentIndex].getTime() - currentTime)) {
      currentIndex = i;
    }
  }
  
  // Move to next or previous event date
  const newIndex = days > 0 ? 
    Math.min(EVENT_DATES.length - 1, currentIndex + 1) : 
    Math.max(0, currentIndex - 1);
  
  return EVENT_DATES[newIndex];
}

/**
 * Jump forward or backward multiple event dates
 * @param {Date} date - Current date
 * @param {number} months - Direction (positive = forward, negative = backward)
 * @returns {Date} New event date
 */
export function moveDateByMonths(date, months) {
  if (EVENT_DATES.length === 0) {
    // Fallback to regular month movement if no event dates
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }
  
  // Find the current position in the event dates array
  const currentTime = date.getTime();
  let currentIndex = 0;
  
  // Find closest current position
  for (let i = 0; i < EVENT_DATES.length; i++) {
    if (Math.abs(EVENT_DATES[i].getTime() - currentTime) < 
        Math.abs(EVENT_DATES[currentIndex].getTime() - currentTime)) {
      currentIndex = i;
    }
  }
  
  // Jump by about 5 events in the specified direction
  const jump = months > 0 ? 5 : -5;
  const newIndex = Math.min(
    EVENT_DATES.length - 1, 
    Math.max(0, currentIndex + jump)
  );
  
  return EVENT_DATES[newIndex];
}
