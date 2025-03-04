import React from "react";
import Container from "../../components/Container";

const HealthDetails = () => {
  return (
    <Container>
      {/* <h1>HeathDetails</h1> */}
      <div className="flex flex-col items-center gap-2 md:p-4 p-0 relative">
        <div className="w-[80%] mt-2 mb-12">
        <p className=" text-[20px]">
          "<span className="text-3xl text-blue-900">H</span>ealth is the crown on the well-being kingdom: all other Jewels pale
          in comparison " In a bid to create a healthy world, our goal is to
          reduce to the barest minimum the incidence of deaths as a result of
          uninformed medical treatments which is rampant in our society.
          Iatrogenic illness is refers to health conditions or complications
          that arise as a direct or indirect result of medical treatments,
          interventions or procedure. It ranks 3rd in the United States among
          the leading cause of deaths beside Heart disease and cancer.
        </p>
        <p className="mt-5 text-[20px]"><span className="text-3xl text-red-600">142,000
          to 251,000</span> persons die by iatrogenesis in the United States where we
          have statistics. Imagine Nigeria where everything is abused? this is what we
          want to bridge with proper consultation free of charge. On here, you
          have the opportunity to discuss your health issues with our clinician
          for appropriate guidance. We will further link you to the best
          consultant and surgeons in the field free of charge while you go about
          your problems straight to the point.
          </p>
          <p className="mt-5 text-[20px]">
          AppSer guarantees ! Sound Health
          is possible.
          </p>
        </div>
        <a href="https://wa.me//+2348165158607">
        <img className="h-[60px] absolute bottom-0 right-0 cursor-pointer rounded-full" alt="whatsapp icon" src="/images/whatsapp-gold.jpg" />
        </a>
      </div>
    </Container>
  );
};

export default HealthDetails;
