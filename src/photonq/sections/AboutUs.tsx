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
  TestimonialText
} from '../../features/photonq/Testimonials';

const AboutUs: FC = () => {
  const testamonialsDefaults = [
    {
      heading: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
      avatar: {
        src: 'https://c5.rgstatic.net/m/437738464651637/images/template/default/profile/profile_default_l.jpg',
        name: 'Tobias Guggemos',
        title: '',
        to: 'https://www.researchgate.net/profile/Tobias-Guggemos'
      }
    },
    {
      heading: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
      avatar: {
        src: 'https://i1.rgstatic.net/ii/profile.image/272411488682018-1441959368536_Q128/Philip-Walther.jpg',
        name: 'Philip Walther',
        title: '',
        to: 'https://www.researchgate.net/profile/Philip-Walther'
      }
    },
    {
      heading: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
      avatar: {
        src: 'https://i1.rgstatic.net/ii/profile.image/11431281181196403-1691945466424_Q128/Felix-Zilk.jpg',
        name: 'Felix Zilk',
        title: '',
        to: 'https://www.researchgate.net/profile/Felix-Zilk'
      }
    },
    {
      heading: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/148873257?s=200&v=4',
        name: 'Netsnek',
        title: 'Development Studio',
        to: 'https://netsnek.com'
      }
    }
  ];

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

        <Wrap justify="center" mt={10} spacing={10} shouldWrapChildren>
          {testamonialsDefaults.map((testimonial, index) => (
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  <Field.Text
                    name={`TestimonialHeading${index}`}
                    defaultValue={testimonial.heading}
                    color="pq.sections.aboutUs.testimonial.heading.color"
                  />
                </TestimonialHeading>
                <TestimonialText>
                  <Field.Text
                    name={`TestimonialText${index}`}
                    defaultValue={testimonial.text}
                  />
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={testimonial.avatar.src}
                name={testimonial.avatar.name}
                title={testimonial.avatar.title}
                to={testimonial.avatar.to}
              />
            </Testimonial>
          ))}
        </Wrap>

        <Center h="10vw" minH="35px" maxH="150px" mt={10}>
          <Field.Image name="AboutUsImage" objectFit="contain" />
        </Center>
      </Container>
    </Box>
  );
};

export default AboutUs;
