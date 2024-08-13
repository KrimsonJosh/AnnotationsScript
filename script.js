(function initializeAutoSelect() {

  // Track which buttons have been clicked
  const clickedButtons = new Set();
  const INTERVAL_MS = 1000; // Interval for re-selecting in milliseconds
  const RUN_DURATION_MS = 3000; // Duration to run the script in milliseconds
  let intervalId = null;
  let observer = null;

  // Function to click all "Strongly Agree" options
  function clickStronglyAgreeOptions() {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
      // Find all "Strongly Agree" radio buttons within the form
      const agreeButtons = form.querySelectorAll('input[type="radio"][value="Strongly Agree"]');
      
      agreeButtons.forEach((button) => {
        if (!button.checked && !clickedButtons.has(button)) {
          // Click the button and mark it as clicked
          button.click();
          clickedButtons.add(button);
        }
      });
    });
  }

  // Start the automatic selection process
  function startAutoSelecting() {
    // Perform the selection immediately
    clickStronglyAgreeOptions();

    // Set up an interval to continue selecting
    intervalId = setInterval(clickStronglyAgreeOptions, INTERVAL_MS);

    // Set up a MutationObserver to handle dynamic changes
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          clickStronglyAgreeOptions();
        }
      });
    });

    // Observe changes in the document body
    observer.observe(document.body, { childList: true, subtree: true });

    // Stop the selection after the specified duration
    setTimeout(stopAutoSelecting, RUN_DURATION_MS);
  }

  // Stop the selection process
  function stopAutoSelecting() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (observer) {
      observer.disconnect();
    }
  }

  // Start the auto-selection process
  startAutoSelecting();

})();
