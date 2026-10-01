const menuButton =
    document.getElementById("menuButton");

const nav =
    document.querySelector(".nav");


/* =========================
   MOBILE MENU
========================= */

if (menuButton && nav) {

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "active"
            );


            if (
                nav.classList.contains(
                    "active"
                )
            ) {

                menuButton.textContent =
                    "✕";

            } else {

                menuButton.textContent =
                    "☰";

            }

        }
    );

}


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            nav.classList.remove(
                "active"
            );


            if (menuButton) {

                menuButton.textContent =
                    "☰";

            }

        }
    );

});


/* =========================
   SCROLL ANIMATIONS
========================= */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .advantage, .process-card, .pricing-card, .hero-card, .contact-box"
    );


if (
    "IntersectionObserver" in window
) {

    const animationObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            animationObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(
        (element) => {

            element.classList.add(
                "hidden"
            );


            animationObserver.observe(
                element
            );

        }
    );

} else {

    animatedElements.forEach(
        (element) => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =========================
   ORDER MODAL
========================= */

const orderModal =
    document.getElementById(
        "orderModal"
    );


const orderModalOverlay =
    document.getElementById(
        "orderModalOverlay"
    );


const orderModalClose =
    document.getElementById(
        "orderModalClose"
    );


const orderForm =
    document.getElementById(
        "orderForm"
    );


const orderName =
    document.getElementById(
        "orderName"
    );


const orderContact =
    document.getElementById(
        "orderContact"
    );


const orderService =
    document.getElementById(
        "orderService"
    );


const orderDescription =
    document.getElementById(
        "orderDescription"
    );


const orderSubmit =
    document.getElementById(
        "orderSubmit"
    );


const orderStatus =
    document.getElementById(
        "orderStatus"
    );


const websiteField =
    document.getElementById(
        "website"
    );


const orderTelegramLink =
    document.getElementById(
        "orderTelegramLink"
    );


/* =========================
   OPEN MODAL
========================= */

function openOrderModal(
    service = ""
) {

    if (!orderModal) {

        console.error(
            "Элемент #orderModal не найден."
        );

        return;

    }


    orderModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    if (orderStatus) {

        orderStatus.textContent =
            "";

        orderStatus.className =
            "order-status";

    }


    if (orderTelegramLink) {

        orderTelegramLink.hidden =
            true;

        orderTelegramLink.href =
            "#";

    }


    if (orderSubmit) {

        orderSubmit.disabled =
            false;

    }


    if (
        service === "site" &&
        orderService
    ) {

        orderService.value =
            "💻 Сайт";

    }


    if (
        service === "bot" &&
        orderService
    ) {

        orderService.value =
            "🤖 Telegram-бот";

    }


    if (
        service === "other" &&
        orderService
    ) {

        orderService.value =
            "⚙️ Інше";

    }


    setTimeout(
        () => {

            if (orderName) {

                orderName.focus();

            }

        },
        300
    );

}


/* =========================
   CLOSE MODAL
========================= */

function closeOrderModal() {

    if (!orderModal) {
        return;
    }


    orderModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =========================
   CLOSE BUTTON
========================= */

if (orderModalClose) {

    orderModalClose.addEventListener(
        "click",
        closeOrderModal
    );

}


if (orderModalOverlay) {

    orderModalOverlay.addEventListener(
        "click",
        closeOrderModal
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (

            event.key === "Escape" &&

            orderModal &&

            orderModal.classList.contains(
                "active"
            )

        ) {

            closeOrderModal();

        }

    }
);


/* =========================
   ORDER BUTTONS
========================= */

const orderButtons =
    document.querySelectorAll(
        ".hero-buttons a[href='#contacts'], " +
        ".pricing-card a[href='#contacts'], " +
        ".portfolio a[href='#contacts']"
    );


orderButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const buttonText =
                    button.textContent
                        .trim()
                        .toLowerCase();


                if (
                    buttonText.includes(
                        "сайт"
                    )
                ) {

                    openOrderModal(
                        "site"
                    );

                    return;

                }


                if (
                    buttonText.includes(
                        "бот"
                    )
                ) {

                    openOrderModal(
                        "bot"
                    );

                    return;

                }


                if (
                    buttonText.includes(
                        "тариф"
                    )
                ) {

                    openOrderModal(
                        "other"
                    );

                    return;

                }


                openOrderModal();

            }
        );

    }
);


/* =========================
   ORDER FORM
========================= */

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                orderName?.value.trim() ||
                "";


            const contact =
                orderContact?.value.trim() ||
                "";


            const service =
                orderService?.value ||
                "";


            const description =
                orderDescription?.value.trim() ||
                "";


            const website =
                websiteField?.value.trim() ||
                "";


            if (

                !name ||
                !contact ||
                !service ||
                !description

            ) {

                orderStatus.textContent =
                    "Заповніть усі поля.";

                orderStatus.className =
                    "order-status error";

                return;

            }


            if (website) {
                return;
            }


            orderSubmit.disabled =
                true;


            orderStatus.textContent =
                "Відправляємо заявку...";


            orderStatus.className =
                "order-status";


            try {

                const response =
                    await fetch(

                        "https://telegram-bot-5-9gzp.onrender.com/api/order",

                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    name,

                                    contact,

                                    service,

                                    description,

                                    website

                                })

                        }

                    );


                let result = {};


                try {

                    result =
                        await response.json();

                } catch {

                    result = {};

                }


                if (
                    !response.ok
                ) {

                    throw new Error(

                        result.message ||

                        `Ошибка сервера: ${response.status}`

                    );

                }


                orderStatus.textContent =

                    `✅ Заявку успішно відправлено! Номер: #${result.orderId}`;


                orderStatus.className =

                    "order-status success";


                if (

                    orderTelegramLink &&

                    result.telegramLink

                ) {

                    orderTelegramLink.href =
                        result.telegramLink;


                    orderTelegramLink.hidden =
                        false;

                }


                orderForm.reset();


            } catch (error) {

                console.error(
                    "Ошибка отправки:",
                    error
                );


                orderStatus.textContent =

                    "❌ Не вдалося відправити заявку. Спробуйте ще раз.";


                orderStatus.className =
                    "order-status error";


                orderSubmit.disabled =
                    false;

            }

        }
    );

} function createSakuraPetal() {
    const petal = document.createElement("div");

    petal.className = "sakura-petal";

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.animationDuration =
        6 + Math.random() * 7 + "s";

    petal.style.transform =
        `scale(${0.6 + Math.random() * 0.8})`;

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 14000);
}

setInterval(createSakuraPetal, 700);