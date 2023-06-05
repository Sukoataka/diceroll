from flask import Flask
from gpiozero import LED, Button
from time import sleep

app = Flask(__name__)


@app.route('/')
def hello_name():
    return 'Hello!'


@app.route("/leds/<amount>/<amount2>", methods=["GET"])
def leds(amount, amount2):
    try:
        sleep(3)
        led1 = LED(4)
        led2 = LED(17)
        for i in range(int(amount)):
           led1.on()
           sleep(0.4)
           led1.off()
           sleep(0.4)
        sleep(2)
        for i in range(int(amount2)):
           led2.on()
           sleep(0.4)
           led2.off()
           sleep(0.4)
    except:
        return ""
    return ""


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
