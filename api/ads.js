export default function handler(req, res) {
  const ads = [
    {
      id: 1,
      title: "Buy Cheap Hosting 🚀",
      image: "https://api.telegram.org/file/bot8168443966:AAHalzHPzOLozNrTKrK-t0NXb9bBOqQHsqs/photos/file_12.jpg",
      link: "https://example.com/hosting"
    }
  ];

  res.status(200).json(ads); // send all ads
}
