async function subscribe() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    const newlySubscribed = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: ""
    });
  }
}

function App() {
  function handleButtonClick() {
    Notification.requestPermission().then((status) => {
      console.log(status);

      if (status === "granted") {
        new Notification("Hello, world!");
      }

      if (status === "denied") {
        alert("Please enable notifications to use this feature.");
      }

      if (status === "default") {
        alert("Please enable notifications to use this feature.");
      }
    });
  }

  return (
    <div>
      <button onClick={handleButtonClick}>알림 등록</button>
    </div>
  );
}

export default App;
