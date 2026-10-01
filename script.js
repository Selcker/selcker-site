const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }
    });
}


const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");

        if (menuButton) {
            menuButton.textContent = "☰";
        }
    });
});


const animatedElements = document.querySelectorAll(
    ".service-card, .advantage, .process-card, .pricing-card, .hero-card, .contact-box"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});


/* ORDER MODAL */

const orderModal = document.getElementById("orderModal");
const orderModalOverlay = document.getElementById("orderModalOverlay");
const orderModalClose = document.getElementById("orderModalClose");

const orderForm = document.getElementById("orderForm");

const orderName = document.getElementById("orderName");
const orderContact = document.getElementById("orderContact");
const orderService = document.getElementById("orderService");
const orderDescription = document.getElementById("orderDescription");
const orderStatus = document.getElementById("orderStatus");
const orderSubmit = document.getElementById("orderSubmit");

const websiteField = document.getElementById("website");


function openOrderModal(service = "") {
    if (!orderModal) {
        return;
    }

    orderModal.classList.add("active");

    document.body.style.overflow = "hidden";

    orderStatus.textContent = "";
    orderStatus.className = "order-status";

    orderSubmit.disabled = false;

    if (service === "site") {
        orderService.value = "💻 Сайт";
    }

    if (service === "bot") {
        orderService.value = "🤖 Telegram-бот";
    }

    if (service === "other") {
        orderService.value = "⚙️ Інше";
    }

    setTimeout(() => {
        orderName.focus();
    }, 300);
}


function closeOrderModal() {
    if (!orderModal) {
        return;
    }

    orderModal.classList.remove("active");

    document.body.style.overflow = "";

    orderStatus.textContent = "";
    orderStatus.className = "order-status";
}


if (orderModalClose) {
    orderModalClose.addEventListener("click", closeOrderModal);
}

if (orderModalOverlay) {
    orderModalOverlay.addEventListener("click", closeOrderModal);
}


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeOrderModal();
    }
});


const orderLinks = document.querySelectorAll(
    '.hero-buttons a[href="#contacts"], .pricing-card a[href="#contacts"], .portfolio a[href="#contacts"]'
);

orderLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const text = link.textContent.toLowerCase();

        if (text.includes("сайт")) {
            openOrderModal("site");
            return;
        }

        if (text.includes("бот")) {
            openOrderModal("bot");
            return;
        }

        if (text.includes("тариф")) {
            openOrderModal("other");
            return;
        }

        openOrderModal();
    });
});


if (orderForm) {
    orderForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = orderName.value.trim();
        const contact = orderContact.value.trim();
        const service = orderService.value;
        const description = orderDescription.value.trim();
        const website = websiteField.value.trim();

        if (!name || !contact || !service || !description) {
            orderStatus.textContent =
                "Заповніть усі поля.";
            orderStatus.className =
                "order-status error";

            return;
        }

        if (website) {
            return;
        }

        orderSubmit.disabled = true;

        orderStatus.textContent =
            "Відправляємо заявку...";

        orderStatus.className =
            "order-status";


        try {
            const response = await fetch(
                "https://telegram-bot-5-9gzp.onrender.com/api/order",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        contact,
                        service,
                        description,
                        website
                    })
                }
            );


            const result = await response.json();


            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Не вдалося відправити заявку."
                );
            }


            orderStatus.textContent =
                "✅ Заявку успішно відправлено!";

            orderStatus.className =
                "order-status success";


            orderForm.reset();


            setTimeout(() => {
                closeOrderModal();
            }, 1800);

        } catch (error) {

            console.error(error);

            orderStatus.textContent =
                "❌ Не вдалося відправити заявку. Спробуйте ще раз.";

            orderStatus.className =
                "order-status error";

            orderSubmit.disabled = false;
        }
    });
}