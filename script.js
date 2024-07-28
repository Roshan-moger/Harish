const button = document.getElementById("work1");

function animateCircle(circle) {
  const svg = circle.querySelector("svg");
  const percent = circle.getAttribute("data-percent");
  const progressCircle = svg.querySelectorAll("circle")[1];
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const numberText = circle.querySelector("span");

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  const offset = circumference - (percent / 100) * circumference;

  const duration = 1800;
  const startTimestamp = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    progressCircle.style.strokeDashoffset =
      circumference - progress * (circumference - offset);
    numberText.textContent = `${Math.round(progress * percent)}%`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function checkCirclesInViewport() {
  const circles = document.querySelectorAll(".circle_box");
  circles.forEach((circle) => {
    if (isElementInViewport(circle) && !circle.classList.contains("animated")) {
      animateCircle(circle);
      circle.classList.add("animated"); // Mark as animated to avoid re-animation
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedCheckCirclesInViewport = debounce(checkCirclesInViewport, 100);

button.addEventListener("click", () => {
  checkCirclesInViewport(); // Check initially in case some elements are already in view
});
window.addEventListener("scroll", debouncedCheckCirclesInViewport);

//pagination and filter:

var currentPage1 = 1;
var totalPages = 4;

function showPage(pageNumber) {
  currentPage1 = pageNumber;
  updatePagination();
  scrollToWork();
}

function prevPage() {
  if (currentPage1 > 1) {
    currentPage1--;
    updatePagination();
    scrollToWork();
  }
}

function nextPage() {
  if (currentPage1 < totalPages) {
    currentPage1++;
    updatePagination();
    scrollToWork();
  }
}

function updatePagination() {
  requestAnimationFrame(function () {
    var pages = document.querySelectorAll(".page");
    pages.forEach(function (page) {
      page.classList.remove("active");
    });
    document.getElementById("page" + currentPage1).classList.add("active");

    var buttons = document.querySelectorAll(".pagination button");
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });
    document.getElementById("btn" + currentPage1).classList.add("active");

    document.getElementById("prev").disabled = currentPage1 === 1;
    document.getElementById("next").disabled = currentPage1 === totalPages;
  });
}

function scrollToWork() {
  var workElement = document.getElementById("work-button");
  if (workElement) {
    workElement.scrollIntoView({ behavior: "smooth" });
  }
}

//Filterssss:
function filterDiv(category) {
  console.log(`Filtering for category: ${category}`); // Debugging line

  const sections = document.querySelectorAll(".content-section");
  const buttons = document.querySelectorAll(".filter-buttons button");

  // Hide all sections and remove 'show' class
  sections.forEach((section) => {
    section.classList.remove("show");
  });

  // Show the selected section
  if (category === "All") {
    console.log("Showing All section");
    document.querySelector("#All").classList.add("show");
  } else {
    console.log(`Showing ${category} section`);
    document.querySelector(`#${category}`).classList.add("show");
  }

  // Remove 'active' class from all buttons
  buttons.forEach((button) => button.classList.remove("active"));

  // Add 'active' class to the clicked button
  const activeButton = document.querySelector(
    `.filter-buttons button[onclick*='${category}']`
  );
  if (activeButton) {
    console.log(`Activating button for ${category}`);
    activeButton.classList.add("active");
  } else {
    console.warn(`Button for ${category} not found`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  filterDiv("All");
});

/// web pagination
let currentPage = 11;
const totalPages2 = 2;
const webButton = document.getElementById("web-button");

function showPage1(page) {
  const projects = document.querySelectorAll(".project");
  projects.forEach((project) => {
    if (parseInt(project.dataset.page) === page) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });

  document.querySelectorAll(".pagination1 button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.querySelector(`#btn${page}`).classList.add("active");
  scrollToWork();
  currentPage = page;
  document.getElementById("prev1").disabled = currentPage === 11;
  document.getElementById("next1").disabled = currentPage === 22;
}

// Event listener for the "Web" button
webButton.addEventListener("click", function () {
  showPage1(currentPage);
});

// Functions to navigate between pages
function prevPage1() {
  if (currentPage > 11) {
    showPage1(currentPage - 11);
    scrollToWork();
  }
}

function nextPage1() {
  if (currentPage < 22) {
    showPage1(currentPage + 11);
    scrollToWork();
  }
}

//navbar

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
});

$(document).ready(function () {
  $("#contact-form").validate({
    rules: {
      SingleLine: {
        required: true,
        minlength: 2,
      },
      SingleLine1: {
        required: true,
        minlength: 2,
      },
      Email: {
        required: true,
        email: true,
      },
      PhoneNumber_countrycode: {
        required: true,
        minlength: 10,
        digits: true,
      },
      MultiLine: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      SingleLine: {
        required: "Please enter your full name",
        minlength: "Min 2 characters",
      },
      SingleLine1: {
        required: "Please enter your address",
        minlength: "Min 2 characters",
      },
      Email: {
        required: "Please enter your email",
        email: "Please enter a valid email",
      },
      PhoneNumber_countrycode: {
        required: "Please enter your phone number",
        minlength: "10 characters",
        digits: "Please enter only digits",
      },
      MultiLine: {
        required: "Please enter your message",
        minlength: "Min 5 characters",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("error");
      error.insertAfter(element);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
  });
});
