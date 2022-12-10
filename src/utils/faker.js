import _ from "lodash";
import dayjs from "dayjs";

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);
const fakers = {
  fakeusers() {
    const users = [
      { name: "Google", industry: "High-Tech" },
      { name: "Apple", industry: "High-Tech" },
      { name: "Worpress", industry: "High-Tech" },
      { name: "Wix", industry: "High-Tech" },
      { name: "Waze", industry: "High-Tech" },
      { name: "Free", industry: "Telecommunication" },
      { name: "Golan Telecom", industry: "Telecommunication" },
      { name: "Instagram", industry: "Social Network" },
      { name: "Facebook", industry: "Social Network" },
      { name: "Samsung", industry: "High-Tech" },
      { name: "Lenovo", industry: "High-tech" },
      { name: "Eretz Develpment", industry: "Digital Marketing" }
    ];

    return _.sampleSize(users, 3).map((user) => {
      return {
        name: user.name,
        industry: user.industry,
        email: _.toLower(_.replace(user.name, / /g, "") + "@gmail.com"),
      };
    });
  },
    fakecustomers() {
    const customers = [
      { name: "Sylvie", industry: "High-Tech" },
      { name: "Bernard", industry: "High-Tech" },
      { name: "Jean Pierre", industry: "High-Tech" },
      { name: "Francois", industry: "High-Tech" },
      { name: "Brigitte", industry: "High-Tech" },
      { name: "Candice", industry: "Telecommunication" },
      { name: "Bruno", industry: "Telecommunication" },
      { name: "Pierre", industry: "Social Network" },
      { name: "Carole", industry: "Social Network" },
      { name: "Michel", industry: "High-Tech" },
      { name: "Philippe", industry: "High-tech" },
      { name: "Florient", industry: "Digital Marketing" }
    ];

    return _.sampleSize(customers, 3).map((customer) => {
      return {
        name: customer.name,
        industry: customer.industry,
        email: _.toLower(_.replace(customer.name, / /g, "") + "@gmail.com"),
      };
    });
  },
  fakePhotos() {
    const photos = [];
    for (let i = 0; i < 15; i++) {
      photos[photos.length] =
        imageAssets[
          "/src/assets/images/profile-" + _.random(1, 15) + ".jpg"
        ].default;
    }
    return _.sampleSize(photos, 10);
  },
  fakeImages() {
    const images = [];
    for (let i = 0; i < 15; i++) {
      images[images.length] =
        imageAssets[
          "/src/assets/images/preview-" + _.random(1, 15) + ".jpg"
        ].default;
    }
    return _.sampleSize(images, 10);
  },
  fakeDates() {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates[dates.length] = dayjs
        .unix(_.random(1586584776897, 1672333200000) / 1000)
        .format("DD MMMM YYYY");
    }
    return _.sampleSize(dates, 3);
  },
  fakeTimes() {
    const times = [
      "01:10 PM",
      "05:09 AM",
      "06:05 AM",
      "03:20 PM",
      "04:50 AM",
      "07:00 PM",
    ];
    return _.sampleSize(times, 3);
  },
  fakeFormattedTimes() {
    const times = [
      _.random(10, 60) + " seconds ago",
      _.random(10, 60) + " minutes ago",
      _.random(10, 24) + " hours ago",
      _.random(10, 20) + " days ago",
      _.random(10, 12) + " months ago",
    ];
    return _.sampleSize(times, 3);
  },
  fakeTotals() {
    return _.shuffle([_.random(20, 220), _.random(20, 120), _.random(20, 50)]);
  },
  fakeTrueFalse() {
    return _.sampleSize([false, true, true], 1);
  },
  fakeStocks() {
    return _.shuffle([_.random(50, 220), _.random(50, 120), _.random(50, 50)]);
  },
  fakeProducts() {
    const products = [
      { name: "Website Advanced", category: "PC & Laptop" },
      { name: "SEO", category: "PC & Laptop" },
      { name: "Community Management", category: "Smartphone & Tablet" },
      { name: "Website Basic", category: "Smartphone & Tablet" },
      { name: "Website Pro", category: "Electronic" },
      { name: "Landing Page", category: "Electronic" },
      { name: "Blog", category: "Sport & Outdoor" },
      { name: "Branding", category: "Sport & Outdoor" },
      { name: "Logo", category: "Photography" },
      { name: "Campaings", category: "Photography" },
    ];
    return _.shuffle(products);
  },
  fakeNews() {
    const news = [
      {
        title: "Desktop publishing software like Aldus PageMaker",
        superShortContent: _.truncate(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          {
            length: 30,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        title: "Dummy text of the printing and typesetting industry",
        superShortContent: _.truncate(
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          {
            length: 30,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      },
      {
        title: "Popularised in the 1960s with the release of Letraset",
        superShortContent: _.truncate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
          {
            length: 30,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      },
      {
        title: "200 Latin words, combined with a handful of model sentences",
        superShortContent: _.truncate(
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
          {
            length: 50,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      },
    ];
    return _.shuffle(news);
  },
  fakeFiles() {
    const files = [
      { fileName: "Celine Dion - Ashes.mp4", type: "MP4", size: "20 MB" },
      { fileName: "Laravel 7", type: "Empty Folder", size: "120 MB" },
      { fileName: fakers.fakeImages()[0], type: "Image", size: "1.2 MB" },
      { fileName: "Repository", type: "Folder", size: "20 KB" },
      { fileName: "Resources.txt", type: "TXT", size: "2.2 MB" },
      { fileName: "Routes.php", type: "PHP", size: "1 KB" },
      { fileName: "Dota 2", type: "Folder", size: "112 GB" },
      { fileName: "Documentation", type: "Empty Folder", size: "4 MB" },
      { fileName: fakers.fakeImages()[0], type: "Image", size: "1.4 MB" },
      { fileName: fakers.fakeImages()[0], type: "Image", size: "1 MB" },
    ];
    return _.shuffle(files);
  },
  fakeJobs() {
    const jobs = [
      { name: "Frontend Engineer", access: "Technical Team" },
      { name: "Backend Engineer", access: "Technical Team" },
      { name: "DevOps Engineer", access: "Technical Team" },
      { name: "UX/UI Designer", access: "Design Team" },
      { name: "Commercial Director", access: "Sales Department" },
      { name: "Commercial", access: "Sales Department" },
      { name: "CEO", access: "Executive Management" },
      { name: "CTO", access: "Executive Management" },
    ];
    return _.shuffle(jobs);
  },
  fakeNotificationCount() {
    return _.random(1, 7);
  },
  fakeFoods() {
    const foods = [
      {
        name: "Vanilla Latte",
        image: imageAssets["/src/assets/images/food-beverage-1.jpg"].default,
      },
      {
        name: "Milkshake",
        image: imageAssets["/src/assets/images/food-beverage-2.jpg"].default,
      },
      {
        name: "Soft Drink",
        image: imageAssets["/src/assets/images/food-beverage-3.jpg"].default,
      },
      {
        name: "Root Beer",
        image: imageAssets["/src/assets/images/food-beverage-4.jpg"].default,
      },
      {
        name: "Pocari",
        image: imageAssets["/src/assets/images/food-beverage-5.jpg"].default,
      },
      {
        name: "Ultimate Burger",
        image: imageAssets["/src/assets/images/food-beverage-6.jpg"].default,
      },
      {
        name: "Hotdog",
        image: imageAssets["/src/assets/images/food-beverage-7.jpg"].default,
      },
      {
        name: "Avocado Burger",
        image: imageAssets["/src/assets/images/food-beverage-8.jpg"].default,
      },
      {
        name: "Spaghetti Fettucine Aglio with Beef Bacon",
        image: imageAssets["/src/assets/images/food-beverage-9.jpg"].default,
      },
      {
        name: "Spaghetti Fettucine Aglio with Smoked Salmon",
        image: imageAssets["/src/assets/images/food-beverage-10.jpg"].default,
      },
      {
        name: "Curry Penne and Cheese",
        image: imageAssets["/src/assets/images/food-beverage-11.jpg"].default,
      },
      {
        name: "French Fries",
        image: imageAssets["/src/assets/images/food-beverage-12.jpg"].default,
      },
      {
        name: "Virginia Cheese Fries",
        image: imageAssets["/src/assets/images/food-beverage-13.jpg"].default,
      },
      {
        name: "Virginia Cheese Wedges",
        image: imageAssets["/src/assets/images/food-beverage-14.jpg"].default,
      },
      {
        name: "Fried/Grilled Banana",
        image: imageAssets["/src/assets/images/food-beverage-15.jpg"].default,
      },
      {
        name: "Crispy Mushroom",
        image: imageAssets["/src/assets/images/food-beverage-16.jpg"].default,
      },
      {
        name: "Fried Calamari",
        image: imageAssets["/src/assets/images/food-beverage-17.jpg"].default,
      },
      {
        name: "Chicken Wings",
        image: imageAssets["/src/assets/images/food-beverage-18.jpg"].default,
      },
      {
        name: "Snack Platter",
        image: imageAssets["/src/assets/images/food-beverage-19.jpg"].default,
      },
    ];
    return _.shuffle(foods);
  },
};

const fakerData = [];
for (let i = 0; i < 20; i++) {
  fakerData[fakerData.length] = {
    users: fakers.fakeusers(),
    customers: fakers.fakecustomers(),
    photos: fakers.fakePhotos(),
    images: fakers.fakeImages(),
    dates: fakers.fakeDates(),
    times: fakers.fakeTimes(),
    formattedTimes: fakers.fakeFormattedTimes(),
    totals: fakers.fakeTotals(),
    trueFalse: fakers.fakeTrueFalse(),
    stocks: fakers.fakeStocks(),
    products: fakers.fakeProducts(),
    news: fakers.fakeNews(),
    files: fakers.fakeFiles(),
    jobs: fakers.fakeJobs(),
    notificationCount: fakers.fakeNotificationCount(),
    foods: fakers.fakeFoods(),
  };
}

export const faker = () => {
  return fakerData;
};
