// BWP401 - SVU events guide main js 

document.addEventListener('DOMContentLoaded', () => 
    {
    // filter events - save preference
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const dateFilter = document.getElementById('dateFilter');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const eventItems = document.querySelectorAll('.event-item');
    const noResultsMsg = document.getElementById('noResultsMsg');

    function filterEvents() 
    {
        if (eventItems.length === 0) return;

        const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const catVal = categoryFilter ? categoryFilter.value : 'all';
        const locVal = locationFilter ? locationFilter.value : 'all';
        const dateVal = dateFilter ? dateFilter.value : '';

        // save category preference to localstorage 
        if (categoryFilter) 
        {
            localStorage.setItem('preferred_category', catVal);
        }

        let visibleCount = 0;

        eventItems.forEach(item => 
        {
            const title = item.getAttribute('data-title').toLowerCase();
            const category = item.getAttribute('data-category');
            const location = item.getAttribute('data-location');
            const date = item.getAttribute('data-date');

            const matchSearch = title.includes(searchVal);
            const matchCat = (catVal === 'all' || category === catVal);
            const matchLoc = (locVal === 'all' || location === locVal);
            const matchDate = (dateVal === '' || date === dateVal);

            if (matchSearch && matchCat && matchLoc && matchDate) 
            {
                item.style.display = 'block';
                visibleCount++;
            } 
            else 
            {
                item.style.display = 'none';
            }
        });

        if (noResultsMsg)
        {
            noResultsMsg.classList.toggle('d-none', visibleCount > 0);
        }
    }

    // load saved category preference to localstorage 
    if (categoryFilter) 
    {
        const savedCat = localStorage.getItem('preferred_category');
        if (savedCat) 
        {
            categoryFilter.value = savedCat;
            filterEvents();
        }
        categoryFilter.addEventListener('change', filterEvents);
    }

    if (searchInput) searchInput.addEventListener('input', filterEvents);
    if (locationFilter) locationFilter.addEventListener('change', filterEvents);
    if (dateFilter) dateFilter.addEventListener('change', filterEvents);

    if (resetFilterBtn) 
    {
        resetFilterBtn.addEventListener('click', () => 
        {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (locationFilter) locationFilter.value = 'all';
            if (dateFilter) dateFilter.value = '';
            localStorage.removeItem('preferred_category');
            filterEvents();
        });
    }

    // quick filter badges : save preference - navigate
    document.querySelectorAll('.quick-filter-badge').forEach(badge => 
    {
        badge.addEventListener('click', (e) => 
        {
            e.preventDefault();
            localStorage.setItem('preferred_category', badge.getAttribute('data-cat'));
            window.location.href = 'events.html';
        });
    });

    //contact form validation - alerts 
    const contactForm = document.getElementById('contactForm');
    const alertContainer = document.getElementById('alertContainer');

    if (contactForm) 
    {
        contactForm.addEventListener('submit', (e) => 
        {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            // email validation pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) 
            {
                showAlert('danger', 'يرجى تعبئة كافة الحقول المطلوبة (الاسم، البريد، والرسالة).');
                return;
            }

            if (!emailPattern.test(email)) 
            {
                showAlert('danger', 'يرجى إدخال صيغة بريد إلكتروني صحيحة (مثال: user@svuonline.org).');
                return;
            }

            if (message.length < 10)
            {
                showAlert('warning', 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.');
                return;
            }

            showAlert('success', `شكراً لتواصلك معنا يا ${name}! تم إرسال رسالتك بنجاح.`);
        });
    }

    function showAlert(type, messageText) 
    {
        if (!alertContainer) return;
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show rounded-4 shadow-sm" role="alert">
                <i class="bi bi-info-circle-fill me-2"></i> ${messageText}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    // events details buttons - booking modal 
    const addToCalBtn = document.getElementById('addToCalBtn');
    const shareEventBtn = document.getElementById('shareEventBtn');
    const bookingForm = document.getElementById('bookingForm');

    if (addToCalBtn) 
    {
        addToCalBtn.addEventListener('click', () => 
        {
            alert(' تمت إضافة الفعالية إلى تقويمك بنجاح!');
        });
    }

    if (shareEventBtn) 
    {
        shareEventBtn.addEventListener('click', () => 
        {
            navigator.clipboard?.writeText(window.location.href);
            alert('🔗 تم نسخ رابط الفعالية لمشاركته مع أصدقائك!');
        });
    }

    if (bookingForm) 
    {
        bookingForm.addEventListener('submit', (e) => 
        {
            e.preventDefault();
            const attendeeName = document.getElementById('attendeeName').value;
            document.getElementById('bookingModalBody').innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-check-circle-fill text-success display-4 mb-3 d-block"></i>
                    <h5 class="fw-bold">تم تأكيد حجزك المبدئي!</h5>
                    <p class="text-muted mb-0">أهلاً بك يا <strong>${attendeeName}</strong>، تم تسجيل اسمك في قائمة الحضور.</p>
                </div>
            `;
        });
    }
});
    // Scroll to top 
    document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        scrollTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

    //  Dark Mode Feature 
    document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    function updateDarkModeToggleStyle() {
        if (!darkModeToggle) return;

        if (body.classList.contains("dark-mode")) {
            darkModeToggle.style.removeProperty("color");
            darkModeToggle.style.removeProperty("border-color");
            darkModeToggle.style.removeProperty("background-color");
            return;
        }

        darkModeToggle.style.setProperty("color", "#dc2626", "important");
        darkModeToggle.style.setProperty("border-color", "#dc2626", "important");
        darkModeToggle.style.setProperty("background-color", "transparent", "important");
    }

    // Check for saved user preference in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        if (darkModeToggle) darkModeToggle.textContent = "☀️ الوضع الفاتح";
    }
    updateDarkModeToggleStyle();

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            body.classList.toggle("dark-mode");
            updateDarkModeToggleStyle();

            // Toggle icon/text and save preference
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                darkModeToggle.textContent = "☀️ الوضع الفاتح";
            } else {
                localStorage.setItem("darkMode", "disabled");
                darkModeToggle.textContent = "🌙 تبديل الوضع";
            }
        });
    }
});
