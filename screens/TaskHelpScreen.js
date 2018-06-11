import React from "react";
import { StyleSheet, View } from "react-native";
import { MyText } from "../components/MyText";
import { ScrollingPageContainer } from "../components/ScrollingPageContainer";
import { Title3 } from "../components/Title3";

export default class TaskHelpScreen extends React.Component {
  static navigationOptions = {
    title: "Mindfulness Assistance"
  };

  render() {
    const { activeTask } = this.props;

    return (
      <ScrollingPageContainer>
        <View style={styles.header}>
          <Title3>What am I supposed to do?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            Each mindful experience has 3 parts:{"\n"}
            {"\n"}
            - Observing - Complete the activity that you selected. Follow the
            instructions, check the tips, and during the activity, pay attention
            the prompt provided. More info on observing below.{"\n"}
            {"\n"}
            - Journaling your observations - Write down any observations that
            you had. Leverage the prompt to provide insight into the sense or
            thought that was asked of you.{"\n"}
            {"\n"}
            - Journaling your feelings - Write down how you feel after
            completing the activity. If you need to take a moment to check in
            with yourself, do so now. More info on check-ins below.
          </MyText>
          <Title3>What is observing / what is mindfulness?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            Mindfulness (or observing) is awareness of the present moment. It is
            living in the "now" and not thinking about the past or the future.
            In order to be mindful, sometimes it is helpful to close your eyes
            or focus on your breath. Your breath is always with you. You can
            always come back to your breath in life when you need help being
            more aware of the world around you.
          </MyText>
          <Title3>What are the prompts for?</Title3>
          <MyText style={{ marginBottom: 24 }}>
            Each activity has a prompt that may change each time you complete
            it. It is based around one of the 5 senses or a thought that will
            help you recognize something you may have never noticed before. We
            can leverage our senses in our observation to experience the world
            around us.
          </MyText>
          <Title3>I'm having trouble focusing</Title3>
          <MyText style={{ marginBottom: 24 }}>
            It's OK and totally normal for your mind to wander. In fact, the act
            of noticing that your thoughts have wandered is all part of the
            practice! The more you realize your mind wandering during practice,
            the better you will get at noticing it in the future, and you will
            even start to notice it during everyday moments.
          </MyText>
          <Title3>
            What should I do when I notice my thoughts are somewhere else?
          </Title3>
          <MyText style={{ marginBottom: 24 }}>
            When you notice that your thoughts have wandered, gently note it
            (i.e. "Ah ok, my thoughts were wandering"), and bring your attention
            back to your practice and simply begin again. Bringing your
            attention back may mean focusing on your breath, observing your
            thoughts but not chasing them, etc. This may happen dozens of times
            during a practice and that's OK! Each time it happens is a chance to
            train your mind to recognize those wandering thoughts.
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
