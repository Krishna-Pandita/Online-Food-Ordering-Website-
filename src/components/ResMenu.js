import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import menudata from "../utils/menudata";

// Mock menus for different restaurants
const mockMenus = {

  "1003414": { // Pizza Hut
    "statusCode": 0,
    "data": {
      "statusMessage": "done successfully",
      "cards": [
        {
          "groupedCard": {
            "cardGroupMap": {
              "REGULAR": {
                "cards": [
                  {
                    "card": {
                      "card": {
                        "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                        "title": "Pizzas",
                        "itemCards": [
                          {
                            "card": {
                              "info": {
                                "id": "1",
                                "name": "Margherita Pizza",
                                "price": 20000,
                                "defaultPrice": 20000
                              }
                            }
                          },
                          {
                            "card": {
                              "info": {
                                "id": "2",
                                "name": "Pepperoni Pizza",
                                "price": 25000,
                                "defaultPrice": 25000
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  },

  "234875": menudata,
   // Adil Hotel - use existing

  "151656": { // Dev International
    "statusCode": 0,
    "data": {
      "statusMessage": "done successfully",
      "cards": [
        {
          "groupedCard": {
            "cardGroupMap": {
              "REGULAR": {
                "cards": [
                  {
                    "card": {
                      "card": {
                        "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                        "title": "Chinese",
                        "itemCards": [
                          {
                            "card": {
                              "info": {
                                "id": "3",
                                "name": "Chow Mein",
                                "price": 15000,
                                "defaultPrice": 15000
                              }
                            }
                          },
                          {
                            "card": {
                              "info": {
                                "id": "4",
                                "name": "Spring Rolls",
                                "price": 12000,
                                "defaultPrice": 12000
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  },
  
  "151518": { // Bakery World
    "statusCode": 0,
    "data": {
      "statusMessage": "done successfully",
      "cards": [
        {
          "groupedCard": {
            "cardGroupMap": {
              "REGULAR": {
                "cards": [
                  {
                    "card": {
                      "card": {
                        "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                        "title": "Bakery",
                        "itemCards": [
                          {
                            "card": {
                              "info": {
                                "id": "5",
                                "name": "Chocolate Cake",
                                "price": 30000,
                                "defaultPrice": 30000
                              }
                            }
                          },
                          {
                            "card": {
                              "info": {
                                "id": "6",
                                "name": "Vanilla Ice Cream",
                                "price": 10000,
                                "defaultPrice": 10000
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  },

  "151649": { // Hotel Sai Nath
    "statusCode": 0,
    "data": {
      "statusMessage": "done successfully",
      "cards": [
        {
          "groupedCard": {
            "cardGroupMap": {
              "REGULAR": {
                "cards": [
                  {
                    "card": {
                      "card": {
                        "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                        "title": "North Indian",
                        "itemCards": [
                          {
                            "card": {
                              "info": {
                                "id": "7",
                                "name": "Butter Chicken",
                                "price": 25000,
                                "defaultPrice": 25000
                              }
                            }
                          },
                          {
                            "card": {
                              "info": {
                                "id": "8",
                                "name": "Paneer Tikka",
                                "price": 20000,
                                "defaultPrice": 20000
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
  
  // Add more as needed
};

const ResMenu = () => {

  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);

const {resId} = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      // console.log("Fetching menu for resId:", resId);
      // Using mock data for now
      const menu = mockMenus[resId] || menudata || "no restaurant"; // Fallback to Adil Hotel menu
      setMenuData(menu);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Error loading menu</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!menuData) return <Shimmer />;

  // 🔽 STEP 1: extract REGULAR cards
const regularCards =
  menuData?.data?.cards
    ?.find(card => card.groupedCard)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // 🔽 STEP 2: filter ItemCategory
const categories = regularCards.filter(c => {
  const type = c.card?.card?.["@type"];

  return (
    type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
    type === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );
});

  return (
    <div className="p-6 px-18">
    {categories.map((category, index) => {
  const type = category.card.card["@type"];

  return (
    <div key={`category-${index}`} className="mb-8">

      <h2 className="text-xl font-bold mb-4 ">
        {category.card.card.title}
      </h2>

      {/* ✅ ItemCategory */}
      {type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
        category.card.card.itemCards.map((item, i) => (
          <div
            key={`item-${i}`}
            className="flex justify-between border-b py-2"
          >
            <p className="">{item.card.info.name}</p>

            <div className="flex justify-end gap-6">
            <p>
              ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
            </p>
            

            <button className=" bg-black text-white p-2 cursor-pointer rounded-2xl">Add +</button>
            </div>

          </div>
        ))}

      {/* ✅ NestedItemCategory */}
      {type === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" &&
        category.card.card.categories.map((subCat, subIndex) => (
          <div key={`sub-${subIndex}`} className="ml-4">

            <h3 className="font-semibold mt-4 mb-2 ">
              {subCat.title}
            </h3>

            {subCat.itemCards.map((item, i) => (
              <div
                key={`nested-item-${i}`}
                className="flex justify-between border-b py-2 "
              >
                <p>{item.card.info.name}</p>
                            <div className="flex justify-end gap-6">

                <p>
                  ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
                </p>
            <button className=" bg-black text-white p-2 cursor-pointer rounded-2xl">Add +</button>
            </div>

              </div>
            ))}

          </div>
        ))}
    </div>
  );
})}

    </div>
  );
};

export default ResMenu;
