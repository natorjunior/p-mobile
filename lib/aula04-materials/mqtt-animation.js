// Configuração da animação MQTT
const canvas = document.getElementById('mqttCanvas');
const ctx = canvas.getContext('2d');

// Cores e configurações
const COLORS = {
    publisher: '#2ecc71',
    broker: '#3498db',
    subscriber: '#e74c3c',
    message: '#f1c40f'
};

class MQTTFlowAnimation {
    constructor() {
        this.nodes = {
            publisher: { x: 100, y: 200, label: 'Publisher' },
            broker: { x: 400, y: 200, label: 'Broker' },
            subscribers: [
                { x: 700, y: 100, label: 'Subscriber 1' },
                { x: 700, y: 200, label: 'Subscriber 2' },
                { x: 700, y: 300, label: 'Subscriber 3' }
            ]
        };
        this.message = { x: 100, y: 200 };
        this.animating = false;
    }

    drawNode(x, y, label, color) {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 50);
    }

    drawMessage(x, y) {
        ctx.beginPath();
        ctx.rect(x - 10, y - 10, 20, 20);
        ctx.fillStyle = COLORS.message;
        ctx.fill();
    }

    drawConnections() {
        ctx.beginPath();
        ctx.strokeStyle = '#95a5a6';
        ctx.lineWidth = 2;
        
        // Linha Publisher -> Broker
        ctx.moveTo(this.nodes.publisher.x + 30, this.nodes.publisher.y);
        ctx.lineTo(this.nodes.broker.x - 30, this.nodes.broker.y);
        
        // Linhas Broker -> Subscribers
        this.nodes.subscribers.forEach(sub => {
            ctx.moveTo(this.nodes.broker.x + 30, this.nodes.broker.y);
            ctx.lineTo(sub.x - 30, sub.y);
        });
        
        ctx.stroke();
    }

    animate() {
        if (this.animating) return;
        this.animating = true;
        this.message.x = this.nodes.publisher.x;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawConnections();
            
            // Desenhar nós
            this.drawNode(this.nodes.publisher.x, this.nodes.publisher.y, 'Publisher', COLORS.publisher);
            this.drawNode(this.nodes.broker.x, this.nodes.broker.y, 'Broker', COLORS.broker);
            this.nodes.subscribers.forEach(sub => {
                this.drawNode(sub.x, sub.y, sub.label, COLORS.subscriber);
            });
            
            // Animar mensagem
            this.drawMessage(this.message.x, this.message.y);
            
            if (this.message.x < this.nodes.broker.x) {
                this.message.x += 5;
                requestAnimationFrame(animate);
            } else if (!this.messageDistributed) {
                this.messageDistributed = true;
                this.distributeMessages();
            }
        };
        
        animate();
    }

    distributeMessages() {
        const distribute = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawConnections();
            
            // Desenhar nós
            this.drawNode(this.nodes.publisher.x, this.nodes.publisher.y, 'Publisher', COLORS.publisher);
            this.drawNode(this.nodes.broker.x, this.nodes.broker.y, 'Broker', COLORS.broker);
            this.nodes.subscribers.forEach(sub => {
                this.drawNode(sub.x, sub.y, sub.label, COLORS.subscriber);
            });
            
            // Animar mensagens para subscribers
            this.nodes.subscribers.forEach((sub, index) => {
                const progress = (Date.now() - this.startTime) / 1000;
                const distance = sub.x - this.nodes.broker.x;
                const x = this.nodes.broker.x + (distance * Math.min(progress, 1));
                const y = sub.y;
                this.drawMessage(x, y);
            });
            
            if (this.message.x < this.nodes.subscribers[0].x) {
                requestAnimationFrame(distribute);
            } else {
                this.animating = false;
                this.messageDistributed = false;
            }
        };
        
        this.startTime = Date.now();
        distribute();
    }

    start() {
        this.animate();
    }
}

// Inicializar animação
const mqttAnimation = new MQTTAnimation();

// Adicionar listener para o botão de demonstração
document.getElementById('demoButton')?.addEventListener('click', () => {
    mqttAnimation.start();
});