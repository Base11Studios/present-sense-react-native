import React from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLOR_BLACK, COLOR_PRIMARY } from '../styles/common';
import { itemWidth, sliderWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';

const ENTRIES = [
  {
    title: 'More Mindful Experiences',
    subtitle:
      'Many more mindful experiences to complete. Discover more ways to be mindful in your daily life.',
    illustration: require('../assets/images/sub_tasks.png')
  },
  {
    title: 'More Affirmations',
    subtitle:
      'Over 150 more daily affirmations. Use these positive statements to empower yourself.',
    illustration: require('../assets/images/sub_affirm.png')
  },
  {
    title: 'Advanced Stats',
    subtitle: 'See your journey from different angles!',
    illustration: require('../assets/images/sub_stats.png')
  },
  {
    title: 'Full history view',
    subtitle:
      'See your historical timeline with all mindful experiences you have completed.',
    illustration: require('../assets/images/sub_history.png')
  }
];

const SLIDER_1_FIRST_ITEM = 0;

export class SubscribeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry data={item} parallax={true} parallaxProps={parallaxProps} />
    );
  }

  render() {
    const { slider1ActiveSlide } = this.state;

    return (
      <View>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={styles.container}
          // loop={true}
          loopClonesPerSide={2}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES.length}
          activeDotIndex={slider1ActiveSlide}
          dotColor={COLOR_PRIMARY}
          dotStyle={styles.paginationDot}
          inactiveDotColor={COLOR_BLACK}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    overflow: 'visible' // for custom animations
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  }
});
