import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar"
import { GridContainer } from "../components/GridContainer/GridContainer"
import { ReservationForm } from "../components/ReservationForm/ReservationForm"
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper"
import { reservationForm, reservationForm2, reservationForm3, reservationForm4, reservationForm5 } from "../static/ReservationForm"

export const Reservation = () => {
  return (
    <>
    <SectionWrapper>
        <GridContainer columns={21}>
            <section>
                <ReservationForm formArray={reservationForm} formArray2={reservationForm2} formArray3={reservationForm3} formArray4={reservationForm4} formArray5={reservationForm5} buttonText='Send reservation'></ReservationForm>
            </section>
            <DestinationSideBar/>
        </GridContainer>

    </SectionWrapper>
    </>
  )
}