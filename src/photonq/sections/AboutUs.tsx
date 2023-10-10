import {
  Button,
  Box,
  Container,
  Center,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { Field } from '@atsnek/jaen';
import { FC } from 'react';
import SectionTitle from '../../features/photonq/SectionTitle';
import {
  Testimonial,
  TestimonialAvatar,
  TestimonialContent,
  TestimonialHeading,
  TestimonialText,
  Testimonials
} from '../../features/photonq/Testimonials';

const AboutUs: FC = () => {
  return (
    <Box
      as="section"
      bgColor="pq.shared.section.bgColor"
      py={20}
      borderBottomRadius="3xl"
      // color="gray.900"
    >
      <Container maxW="7xl" mx="auto">
        <SectionTitle
          label="About Us"
          labelFieldname="AboutUsLabel"
          title="The People Behind"
          alignItems
        />
        <Center>
          <Field.Text
            name="PhotonQText"
            defaultValue="We are a diverse team of scientists, designers, and software developers at the Christian Doppler Laboratory for Photonic Quantum Computing, located at the Faculty of Physics, University of Vienna. Our passion lies in advancing the field of photonic quantum computing, and we are dedicated to offering free online access to our cutting-edge quantum computer through cloud-based services. Experience the power of quantum computing firsthand with our state-of-the-art four-qubit processor, available for experimentation today!"
            mt={5}
            maxW="65%"
            textAlign="center"
            color="pq.sections.aboutUs.description.color"
          />
        </Center>

        <Wrap justify="center" mt={10} shouldWrapChildren>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                Lorem ipsum dolor sit amet
              </TestimonialHeading>
              <TestimonialText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                neque sed imperdiet nibh lectus feugiat nunc sem.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://i1.rgstatic.net/ii/profile.image/11431281181196403-1691945466424_Q128/Felix-Zilk.jpg'
              }
              name={'Felix Zilk'}
              title={'Former ...'}
              to="https://www.researchgate.net/profile/Felix-Zilk"
            />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                Lorem ipsum dolor sit amet
              </TestimonialHeading>
              <TestimonialText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                neque sed imperdiet nibh lectus feugiat nunc sem.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://i1.rgstatic.net/ii/profile.image/272411488682018-1441959368536_Q128/Philip-Walther.jpg'
              }
              name="Philip Walther"
              title={'Former ...'}
              to="https://www.researchgate.net/profile/Philip-Walther"
            />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                Lorem ipsum dolor sit amet
              </TestimonialHeading>
              <TestimonialText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                neque sed imperdiet nibh lectus feugiat nunc sem.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://c5.rgstatic.net/m/437738464651637/images/template/default/profile/profile_default_l.jpg'
              }
              name="Tobias Guggemos"
              title={'Former ...'}
              to="https://www.researchgate.net/profile/Tobias-Guggemos"
            />
          </Testimonial>

          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                Lorem ipsum dolor sit amet
              </TestimonialHeading>
              <TestimonialText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                neque sed imperdiet nibh lectus feugiat nunc sem.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={'https://avatars.githubusercontent.com/u/55870326?s=200&v=4'}
              name="atsnek"
              title={'Development Studio'}
              to="https://atsnek.com"
            />
          </Testimonial>
        </Wrap>

        <Center h="10vw" minH="35px" maxH="150px" mt={10}>
          <Field.Image name="AboutUsImage" objectFit="contain" />
        </Center>
      </Container>
    </Box>
  );
};

export default AboutUs;
