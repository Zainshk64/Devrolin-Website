import React from "react";
import Image from "next/image";
import thumbone from "public/images/service/thumb-one.png";
import thumbtwo from "public/images/service/thumb-two.webp";

const ServiceDetailsMain = ({ mainService }: { mainService: any }) => {
  return (
    <section className="section service-details fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="service-details__slider">
              <div className="service-details__slider-single">
                <div className="poster fade-top">
                  <Image src={mainService.mainImage.url} width={600}  height={600} alt="Image" />
                </div>
                <div className="details-group section__cta text-start">
                  <h3 className="title-anim">Why do we use it?</h3>
                  <p>
               {mainService.whyUsed}
                  </p>              
                </div>
                <div className="section__content-cta">
                  <div className="row gaper">
                    <div className="col-12 col-lg-7">
                      <div className="details-group">
                        <h3 className="title-anim">Our approach</h3>
                        <p>{mainService.approach}</p>
                      </div>
                    </div>
                    <div className="col-12 col-lg-5">
                      <div className="poster-small">
<Image src={mainService.smallImages[0]?.url} width={600} height={600} alt={mainService.smallImages[0]?.alt || "Image"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsMain;
