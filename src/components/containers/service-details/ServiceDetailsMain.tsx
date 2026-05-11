import React from "react";
import Image from "next/image";

const ServiceDetailsMain = ({ mainService }: { mainService: any }) => {
  return (
    <section className="section service-details fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="service-details__slider">
              <div className="service-details__slider-single">
                
                {/* Main Image */}
                <div className="poster fade-top">
                  <Image
                    src={mainService.mainImage?.url || "/placeholder.jpg"}
                    width={600}
                    height={600}
                    alt={mainService.mainImage?.alt || "Service"}
                  />
                </div>

                {/* Short Intro */}
                <div className="details-group section__cta text-start">
                  <h3 className="title-anim">Short Intro</h3>
                  <p>{mainService.shortIntro}</p>
                </div>

                {/* Why Businesses Need This + Small Image */}
                <div className="section__content-cta">
                  <div className="row gaper">
                    <div className="col-12 col-lg-7">
                      <div className="details-group">
                        <h3 className="title-anim">Why Businesses Need This</h3>
                        <p>{mainService.whyBusinessesNeedThis}</p>
                      </div>
                    </div>
                    <div className="col-12 col-lg-5">
                      {mainService.smallImages?.[0]?.url && (
                        <div className="poster-small">
                          <Image
                            src={mainService.smallImages[0].url}
                            width={600}
                            height={600}
                            alt={mainService.smallImages[0]?.alt || "Image"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* What We Build */}
                {mainService.whatWeBuild?.length > 0 && (
                  <div className="details-group mt-5">
                    <h3 className="title-anim">What We Build</h3>
                    <ul className="list-unstyled">
                      {mainService.whatWeBuild.map((item: string, index: number) => (
                        <li key={index} className="mb-2">
                          <i className="fa-solid fa-check-circle text-primary me-2"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsMain;