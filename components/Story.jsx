import React from 'react';
import './Story.css';
import story1 from '../assets/story1.jpg';
import story2 from '../assets/story2.jpg';
import story3 from '../assets/story3.jpg';

const Story = () => {
  return (
    <section className="story-section">
      <div className="story-top">
        <p className="story-label">About Us</p>
        <h2 className="story-heading">Our Story</h2>
        <p className="story-subheading">
          A journey for making successful luxury restaurant with the best services
        </p>
      </div>

      <div className="story-content">
        <div className="story-images">
          <div className="left-images">
            <img src={story1} alt="story1" />
            <div className="right-image-group">
              <img src={story2} alt="story2" className="story2" />
              <img src={story3} alt="story3" className="story3" />
            </div>
          </div>
        </div>

        <div className="story-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat urna id leo euismod rhoncus.
            Aliquam erat volutpat. Nulla id aliquam neque, at dignissim quam. Praesent et lacus accumsan, 
            consequat nisl a, mattis sapien.
          </p>
          <p>
            Nam sodales ullamcorper aliquet. Phasellus ut pretium libero, vitae imperdiet purus. 
            Sed sed tincidunt velit. Aliquam vitae ipsum molestie, vehicula nisi quis, finibus leo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
