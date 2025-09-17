function abrirConvite() {
  const modal = document.getElementById("conviteModal");
  modal.style.display = "block"; // garante reabertura
  modal.classList.add("ativo");

  const carta = modal.querySelector(".carta");
  carta.classList.remove("aberta");
  void carta.offsetWidth;
  carta.classList.add("aberta");

  const audio = document.getElementById("musica");
  audio.muted = false;
  audio.play().catch(() => {
    console.log("Autoplay bloqueado, aguarde interação do usuário.");
  });

  // --- garante que o estado do botão esteja correto ---
  const botao = document.querySelector(".conteudo .button");
  if (presencaConfirmada) {
    botao.disabled = true;
    botao.style.opacity = "0.6";
    botao.style.cursor = "not-allowed";
  } else {
    botao.disabled = false;
    botao.style.opacity = "1";
    botao.style.cursor = "pointer";
  }
}


function fecharConvite() {
  const modal = document.getElementById("conviteModal");
  const carta = modal.querySelector(".carta");

  // remove animação de abertura
  carta.classList.remove("aberta");
  // aplica animação de fechamento
  carta.classList.add("fechando");

  // espera a animação acabar
  setTimeout(() => {
    carta.classList.remove("fechando");
    modal.classList.remove("ativo");
    setTimeout(() => {
      modal.style.display = "none";
    }, 600); // tempo do fade-out do modal
  }, 1200); // tempo da animação de fechar a carta
}


let presencaConfirmada = false; // variável global

function confirmarPresenca() {
  if (presencaConfirmada) {
    document.getElementById("mensagem").innerText =
      "Você já confirmou sua presença 💕";
    return;
  }

  presencaConfirmada = true;
  document.getElementById("mensagem").innerText =
    "Sua presença foi confirmada com carinho! 💕";

  const botao = document.querySelector(".conteudo .button");
  botao.disabled = true;
  botao.style.opacity = "0.6";
  botao.style.cursor = "not-allowed";
}


/* --- Música inicia automaticamente na abertura do site --- */
window.addEventListener("load", () => {
  const audio = document.getElementById("musica");
  audio.muted = false;
  audio.play().catch(() => {
    console.log("Autoplay bloqueado, só vai tocar após interação.");
  });
});

/* --- Chuva de Emojis com interação --- */
function criarEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = "💖"; // pode trocar por outro emoji

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = (Math.random() * 20 + 20) + "px";
  emoji.style.animationDuration = (Math.random() * 3 + 3) + "s";

  document.getElementById("chuva-emojis").appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 6000);
}

// Criar emojis continuamente (menos no celular)
let intervaloEmojis = 400;
if (window.innerWidth < 480) {
  intervaloEmojis = 900; // menos emojis em celular
}
setInterval(criarEmoji, intervaloEmojis);

// --- Interação com o mouse (atração suave) ---
document.addEventListener("mousemove", (e) => {
  const emojis = document.querySelectorAll(".emoji");
  emojis.forEach((emoji) => {
    const rect = emoji.getBoundingClientRect();
    const emojiX = rect.left + rect.width / 2;
    const emojiY = rect.top + rect.height / 2;

    const dx = e.clientX - emojiX;
    const dy = e.clientY - emojiY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
      const strength = (200 - distance) / 200;
      const moveX = dx * 0.2 * strength; 
      const moveY = dy * 0.2 * strength;
      emoji.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      emoji.style.transform = "";
    }
  });
});
