#!/usr/bin/env python3

import json
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

HOST = "0.0.0.0"
PORT = 8765

# Key codes do macOS
# 124 = seta direita
# 123 = seta esquerda
KEYCODES = {
    "next": 124,
    "previous": 123
}

def press_key(command: str):
    keycode = KEYCODES[command]
    script = f'tell application "System Events" to key code {keycode}'
    subprocess.run(["osascript", "-e", script], check=True)

class SlideHandler(BaseHTTPRequestHandler):

    def send_json(self, status_code: int, payload: dict):
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/health":
            return self.send_json(200, {"status": "ok"})

        if parsed.path == "/cmd":
            query = parse_qs(parsed.query)
            command = query.get("c", [""])[0] or query.get("command", [""])[0]
            return self.handle_command(command)

        self.send_json(404, {"error": "not_found"})

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path != "/cmd":
            return self.send_json(404, {"error": "not_found"})

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode("utf-8"))
            command = data.get("command")
        except Exception:
            return self.send_json(400, {"error": "invalid_json"})

        self.handle_command(command)

    def handle_command(self, command):
        if command not in KEYCODES:
            return self.send_json(400, {
                "error": "invalid_command",
                "allowed": ["next", "previous"]
            })

        try:
            press_key(command)
            print(f"[OK] Executado: {command}")
            return self.send_json(200, {
                "success": True,
                "command": command
            })
        except subprocess.CalledProcessError as e:
            return self.send_json(500, {
                "error": "osascript_failed",
                "detail": str(e)
            })

    def log_message(self, format, *args):
        # silencia logs HTTP padrão
        return


def main():
    server = HTTPServer((HOST, PORT), SlideHandler)
    print(f"🎯 Slide Receiver rodando em http://{HOST}:{PORT}")
    print("Teste local:")
    print(f"curl http://localhost:{PORT}/cmd?c=next")
    print(f"curl http://localhost:{PORT}/cmd?c=previous")
    print("Ctrl+C para parar\n")

    server.serve_forever()


if __name__ == "__main__":
    main()
