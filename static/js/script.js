document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const modal = document.getElementById('modal');
  const closeButton = document.getElementById('close-button');
  const menuButton = document.getElementById('menu-button');

  if (menuButton && modal && closeButton) {
      // Show modal function
      function showModal() {
          modal.classList.add('show');
          modal.style.display = 'flex';
      }

      // Hide modal function
      function closeModal() {
          modal.classList.remove('show');
          setTimeout(() => {
              modal.style.display = 'none';
          }, 500);
      }

      // Event listeners for modal actions
      menuButton.addEventListener('click', showModal);
      closeButton.addEventListener('click', closeModal);
      window.addEventListener('click', (event) => {
          if (event.target === modal) {
              closeModal();
          }
      });
  }

  // Tabs functionality
  function openTab(tabName) {
      document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
      document.querySelectorAll(".tab-link").forEach(link => link.classList.remove("active"));
      
      const tabElement = document.getElementById(tabName);
      if (tabElement) {
          tabElement.style.display = "block";
          document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add("active");
      }
  }

  // Set default tab to open on page load
  const defaultTab = document.getElementById("defaultTab");
  if (defaultTab) {
      openTab(defaultTab.getAttribute("onclick").match(/'(.*?)'/)[1]);
  }

  // Typewriting effect with Intersection Observer
  const typewriteElements = document.querySelectorAll(".typewrite");
  if (typewriteElements.length) {
      const startTypingEffect = (element) => {
          const text = element.getAttribute("data-text");
          let index = 0;
          element.textContent = '';
          const typeEffect = () => {
              if (index < text.length) {
                  element.textContent += text.charAt(index);
                  index++;
                  setTimeout(typeEffect, 100);
              }
          };
          typeEffect();
      };
      
      const observer = new IntersectionObserver((entries, observerInstance) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  startTypingEffect(entry.target);
                  observerInstance.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      
      typewriteElements.forEach(element => observer.observe(element));
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (event) {
          const targetSection = document.querySelector(this.getAttribute('href'));
          if (targetSection) {
              event.preventDefault();
              targetSection.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  // Tab switching
  document.querySelectorAll(".tab-link").forEach(tab => {
      tab.addEventListener("click", function () {
          const tabName = this.getAttribute("onclick").match(/'(.*?)'/)[1];
          openTab(tabName);
      });
  });

  // Sticky header behavior
  const header = document.querySelector('.sticky-header');
  if (header) {
      let lastScrollY = window.scrollY;
      let isHovering = false;

      const handleScroll = () => {
          if (isHovering) return;
          if (window.scrollY > lastScrollY) {
              header.classList.add('hidden');
          } else {
              header.classList.remove('hidden');
          }
          lastScrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleScroll);
      header.addEventListener('mouseenter', () => {
          isHovering = true;
          header.classList.remove('hidden');
      });
      header.addEventListener('mouseleave', () => {
          isHovering = false;
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
      const targetSectionId = this.getAttribute('href');
      const targetSection = document.querySelector(targetSectionId);

      if (targetSection) {
        const parentTab = targetSection.closest('.tab-content');
        if (parentTab && !parentTab.classList.contains('active')) {
          event.preventDefault();

          document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
          });

          parentTab.classList.add('active');

          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const togglers = document.querySelectorAll('[data-toggle]');

    togglers.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const selector = e.currentTarget.dataset.toggle
            const block = document.querySelector(`${selector}`);
            if (e.currentTarget.classList.contains('active')) {
                block.style.maxHeight = '';
            } else {
                block.style.maxHeight = block.scrollHeight + 'px';
            }

            e.currentTarget.classList.toggle('active')
        })
    })
})

document.addEventListener("DOMContentLoaded", function () {
    // Check if there's a saved target from a previous page
    const storedTarget = localStorage.getItem("navigateToSection");
    if (storedTarget) {
        navigateToSection(storedTarget);
        localStorage.removeItem("navigateToSection"); // Clear after use
    }

    // Footer navigation for cross-page linking
    document.querySelectorAll('a[href^="product.html#"]').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default jump

            const targetSectionId = this.getAttribute('href').split('#')[1]; // Extract section ID

            if (window.location.pathname.includes("product.html")) {
                // If already on the product page, navigate directly
                navigateToSection(targetSectionId);
            } else {
                // If on a different page (e.g., index.html), store the target and redirect
                localStorage.setItem("navigateToSection", targetSectionId);
                window.location.href = "product.html"; // Redirect to product page
            }
        });
    });

    // Function to handle tab switching and smooth scrolling
    function navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        // Find and activate the correct tab
        const parentTab = targetSection.closest('.tab-content');
        if (parentTab && !parentTab.classList.contains('active')) {
            const tabId = parentTab.getAttribute('id');

            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

            parentTab.classList.add('active');
            document.querySelector(`.tab[data-target="${tabId}"]`).classList.add('active');
        }

        // Scroll smoothly to the section
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
});

