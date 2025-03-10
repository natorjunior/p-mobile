// Verifica se o assunto (tópico) corresponde à inscrição do subscriber
function topicMatches(subscription, topic) {
    if (subscription.endsWith('#')) {
      const prefix = subscription.slice(0, -1);
      return topic.startsWith(prefix);
    }
    return subscription === topic;
  }
  
  // Limpa as linhas desenhadas no SVG
  function clearLines() {
    const svg = document.getElementById('lines-svg');
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
  }
  
  // Desenha uma linha com um rótulo no SVG
  function drawLine(from, to, options) {
    const svg = document.getElementById('lines-svg');
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("stroke", options.stroke || "#000");
    line.setAttribute("stroke-width", options.strokeWidth || 2);
    if (options.dash) {
      line.setAttribute("stroke-dasharray", "5,5");
    }
    svg.appendChild(line);
    
    if (options.label) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      text.setAttribute("x", midX);
      text.setAttribute("y", midY - 5);
      text.setAttribute("fill", options.textColor || "#000");
      text.setAttribute("font-size", "14");
      text.setAttribute("text-anchor", "middle");
      text.textContent = options.label;
      svg.appendChild(text);
    }
  }
  
  // Cria e anima uma mensagem (círculo vermelho) do ponto de origem até o destino
  function animateMessage(fromPos, toPos, delay) {
    const msg = document.createElement('div');
    msg.classList.add('message');
    msg.style.left = fromPos.x + 'px';
    msg.style.top = fromPos.y + 'px';
    msg.style.display = 'block';
    document.getElementById('container').appendChild(msg);
    void msg.offsetWidth;
    setTimeout(() => {
      msg.style.transition = 'all 1s ease-in-out';
      msg.style.left = toPos.x + 'px';
      msg.style.top = toPos.y + 'px';
    }, delay);
    setTimeout(() => {
      msg.remove();
    }, delay + 1200);
  }
  
  // Cria uma tooltip para os nós
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  document.getElementById('container').appendChild(tooltip);
  const nodes = document.querySelectorAll('.node');
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const text = node.getAttribute('data-tooltip');
      tooltip.textContent = text;
      const rect = node.getBoundingClientRect();
      const containerRect = document.getElementById('container').getBoundingClientRect();
      tooltip.style.left = (rect.left - containerRect.left + rect.width/2) + 'px';
      tooltip.style.top = (rect.top - containerRect.top - 30) + 'px';
      tooltip.style.opacity = 1;
    });
    node.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
    });
    node.addEventListener('click', () => {
      alert(node.getAttribute('data-tooltip'));
    });
  });
  
  // Lógica de envio: anima do Remetente para a Central e encaminha para os Departamentos
  document.getElementById('publishButton').addEventListener('click', () => {
    const topic = document.getElementById('topicInput').value.trim();
    if (!topic) {
      alert('Por favor, insira um assunto válido.');
      return;
    }
    clearLines();
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    const publisherRect = document.getElementById('publisher').getBoundingClientRect();
    const brokerRect = document.getElementById('broker').getBoundingClientRect();
    
    const publisherCenter = {
      x: publisherRect.left - containerRect.left + publisherRect.width / 2,
      y: publisherRect.top - containerRect.top + publisherRect.height / 2
    };
    const brokerCenter = {
      x: brokerRect.left - containerRect.left + brokerRect.width / 2,
      y: brokerRect.top - containerRect.top + brokerRect.height / 2
    };
    
    // Desenha a linha do Remetente para a Central, exibindo o assunto
    drawLine(publisherCenter, brokerCenter, {
      stroke: "#000",
      strokeWidth: 2,
      label: "Assunto: " + topic,
      textColor: "#000"
    });
    
    animateMessage(publisherCenter, brokerCenter, 100);
    
    // Encaminha a mensagem para cada Departamento (Subscriber)
    setTimeout(() => {
      const subscribers = [
        { element: document.getElementById('subscriber1'), subscription: 'financeiro/#' },
        { element: document.getElementById('subscriber2'), subscription: 'financeiro/pagamentos' },
        { element: document.getElementById('subscriber3'), subscription: 'rh/#' }
      ];
      subscribers.forEach((sub, index) => {
        const subRect = sub.element.getBoundingClientRect();
        const subCenter = {
          x: subRect.left - containerRect.left + subRect.width / 2,
          y: subRect.top - containerRect.top + subRect.height / 2
        };
        if (topicMatches(sub.subscription, topic)) {
          drawLine(brokerCenter, subCenter, {
            stroke: "#27ae60",
            strokeWidth: 2,
            label: "Enviado (" + sub.subscription + ")",
            textColor: "#27ae60"
          });
          animateMessage(brokerCenter, subCenter, index * 300);
        } else {
          drawLine(brokerCenter, subCenter, {
            stroke: "#e74c3c",
            strokeWidth: 2,
            dash: true,
            label: "Não corresponde (" + sub.subscription + ")",
            textColor: "#e74c3c"
          });
          const originalColor = sub.element.style.backgroundColor;
          sub.element.style.backgroundColor = '#7f8c8d';
          setTimeout(() => {
            sub.element.style.backgroundColor = originalColor || '#3498db';
          }, 1500);
        }
      });
    }, 1200);
  });
  