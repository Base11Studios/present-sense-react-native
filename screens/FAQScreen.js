import React from "react";
import { StyleSheet, View } from "react-native";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { Title3 } from "../components/Title3";

export default class FAQScreen extends React.Component {
  static navigationOptions = {
    title: "FAQ"
  };

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer>
        <View style={styles.header}>
          <Title3>Why focus on the present?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            Have you ever found yourself ruminating in the past, replaying an
            event, or worrying about the future? A lot of times the thing we're
            worrying about never comes to pass or can't be changed and it was
            all worry for nothing. It happens to all of us, and usually doesn't
            result in us feeling at peace. By bringing our awareness to the
            present, something that is definitely happening, we can appreciate
            what we do have right now. Focusing on the present allows us to
            actually live our lives and enjoy the world around us.
          </MyText>
          <Title3>Why mindful journaling?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            Have you ever tried to start up a mindfulness practice and had
            trouble creating a routine? Or are you consistently meditating but
            looking for more ways to bring mindfulness into your life? Mindful
            journaling helps us vocalize our feelings and notice the benefits of
            being present. By writing down how we feel after a mindful
            experience, we're creating a habit and training ourselves to pay
            attention in everyday life.
          </MyText>
          <Title3>How often should I do Mindful Experiences?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            Everyday, all the time! As you focus on the present, your brain
            actually starts to change. Are there things you don't like doing,
            such as cleaning the dishes or sitting in meetings? Or are there
            things you do everyday that you don't think about, like brushing
            your teeth or driving to work? If you actually bring your focus to
            that activity and pair it with some deep breathing, you can change
            your perception of the activity and actually enjoy your time doing
            it. Think of every moment and every activity you do as a chance to
            practice mindfulness.
          </MyText>
          <Title3>What's coming next in Present Sense?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            We have tons of ideas, but would love you hear from you. Drop us a
            line at support@base11studios.com with comments or suggestions!
          </MyText>
        </View>
      </ScrollingPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20
  }
});
