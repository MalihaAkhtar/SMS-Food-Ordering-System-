import React from 'react';
import DescriptionSection from './FoodPage';

const FoodPage = () => {
  const productsData = [
    {
      foodName: 'Chicken Zinger Burger',
      description: `Our chicken zinger burger is a crispy, spicy delight that’s packed with flavor. 
                    It’s made with a perfectly seasoned, crunchy chicken fillet, layered with fresh 
                    lettuce and a creamy mayo sauce, all nestled between soft, toasted buns.`,
      productHighlights: [
        {
          name: 'Crispy Chicken Wings',
          description: 'Enjoy this delicious snack at your next house party.',
        },
        {
          name: 'Greek Salad',
          description: 'A fresh and healthy option loaded with vegetables and feta cheese.',
        },
        {
          name: 'Chicken Zinger Burger',
          description: 'A spicy, crispy chicken fillet burger with lettuce and creamy sauce.',
        },
      ],
    },
    {
      foodName: 'Spicy Crab Delight',
      description: `Spicy, tangy, and packed with flavor. Our crab meat is coated in a rich, spicy sauce 
                    and served with a side of crispy fries.`,
      productHighlights: [
        {
          name: 'Crab Cakes',
          description: 'Juicy crab meat formed into perfect patties, served with a side of tartar sauce.',
        },
        {
          name: 'Garlic Butter Shrimp',
          description: 'A combination of succulent shrimp cooked in a rich garlic butter sauce.',
        },
        {
          name: 'Spicy Crab Delight',
          description: 'Crab meat coated in a spicy, tangy sauce served with crispy fries.',
        },
      ],
    },
    {
      foodName: 'Vegetarian Pizza',
      description: `A hearty vegetarian pizza loaded with fresh vegetables, mozzarella cheese, and a tangy tomato sauce.`,
      productHighlights: [
        {
          name: 'Mushroom Delight',
          description: 'Fresh mushrooms cooked to perfection with herbs and spices.',
        },
        {
          name: 'Cheese Overload',
          description: 'Mozzarella, cheddar, and parmesan cheeses in a delicious blend.',
        },
        {
          name: 'Vegetarian Pizza',
          description: 'A medley of fresh vegetables topped on a crispy pizza base with mozzarella cheese.',
        },
      ],
    },
  ];

  return (
    <div>
      {/* Rendering DescriptionSection for each product dynamically */}
      {productsData.map((product, index) => (
        <DescriptionSection
          key={index}
          foodName={product.foodName}
          description={product.description}
          productHighlights={product.productHighlights}
        />
      ))}
    </div>
  );
};

export default FoodPage;
