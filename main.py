import threading
import queue
import time

class EventBus:
    def __init__(self):
        self.queue = queue.Queue()
        self.subscribers = {}
        self._running = False
        self._thread = None

    def start(self):
        self._running = True
        self._thread = threading.Thread(target=self._process_events, daemon=True)
        self._thread.start()
        print("Event bus started")
    
    def subscribe(self, event_type, callback):
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(callback)
        print(f"Subscribed to event: {event_type}")
    
    def publish(self, event_type, data):
        self.queue.put((event_type, data))
        print(f"Published event: {event_type}")
    
    def _process_events(self):
        while self._running:
            try:
                event_type, data = self.queue.get(timeout=0.1)
                print(f"Processing event: {event_type}")
                if event_type in self.subscribers:
                    for callback in self.subscribers[event_type]:
                        callback(data)
            except queue.Empty:
                pass
            time.sleep(0.01)

from models.gpt2.model import GPT2Model
from models.nltk.model import NLTKModel
# First import the parent class
from guis.cli.raw_commands.interface import CommandLineInterface
# Then import the child class
from guis.cli.pkm_interface import PKMCommandLineInterface

if __name__ == "__main__":
    print("Starting event bus...")
    event_bus = EventBus()
    event_bus.start()

    # Initialize models
    try:
        print("Creating models...")
        gpt_model = GPT2Model(event_bus)
        nltk_model = NLTKModel(event_bus)
        print("Models created successfully")
    except Exception as e:
        print(f"Error creating models: {e}")
        import traceback
        traceback.print_exc()

    # Choose which interface to run
    interface_choice = input("Select interface: 1) Text Generation, 2) PKM: ")

    if interface_choice == "1":
        cli = CommandLineInterface(event_bus)
        cli.run()
    else:
        pkm_cli = PKMCommandLineInterface(event_bus)
        pkm_cli.run()