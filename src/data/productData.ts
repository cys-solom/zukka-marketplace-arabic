export const productCategories = [
  {
    id: "fresh-meat",
    name: "اللحوم الطازجة",
    description: "أجود أنواع اللحوم الطازجة ذات الجودة العالية",
    backgroundImage: "https://i.postimg.cc/mrZhRVbZ/meat-bg.jpg",
    icon: "🥩",
    products: [
      {
        id: "meat-1",
        name: "لحم بقري مفروم",
        description: "لحم بقري طازج 100%",
        price: 180,
        image: "https://i.postimg.cc/meat1.jpg",
        isNew: false
      },
      {
        id: "meat-2",
        name: "شرائح ستيك",
        description: "شرائح ستيك عالية الجودة",
        price: 220,
        image: "https://i.postimg.cc/meat2.jpg",
        isNew: true
      }
    ]
  },
  {
    id: "fast-food",
    name: "الوجبات السريعة",
    description: "أشهى الوجبات السريعة المحضرة بعناية",
    backgroundImage: "https://i.postimg.cc/fast-food-bg.jpg",
    icon: "🍔",
    products: [
      {
        id: "fast-1",
        name: "تشيز برجر",
        description: "برجر لحم مع جبن شيدر",
        price: 85,
        image: "https://i.postimg.cc/burger1.jpg",
        isNew: true
      },
      {
        id: "fast-2",
        name: "بيتزا بيبروني",
        description: "بيتزا بالجبن والبيبروني",
        price: 120,
        image: "https://i.postimg.cc/pizza1.jpg",
        isNew: false
      }
    ]
  },
  {
    id: "organic",
    name: "منتجات عضوية",
    description: "منتجات طبيعية وعضوية خالية من المواد الحافظة",
    backgroundImage: "https://i.postimg.cc/organic-bg.jpg",
    icon: "🌱",
    products: [
      {
        id: "org-1",
        name: "خضروات عضوية",
        description: "خضروات طازجة من الزراعة العضوية",
        price: 45,
        image: "https://i.postimg.cc/veggies1.jpg",
        isNew: true
      }
    ]
  }
];
