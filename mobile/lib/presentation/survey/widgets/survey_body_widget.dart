import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/survey/widgets/survey_question.widget.dart';

class SurveyBodyWidget extends StatelessWidget {
  const SurveyBodyWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFFBDDDFD),
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            const SurveyQuestionWidget(
              question: 'What is the patient\'s blood pressure level?',
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
              child: TextField(
                style: const TextStyle(fontFamily: 'Roboto'),
                decoration: InputDecoration(
                  hintText: 'Enter answer here',
                  hintStyle: const TextStyle(fontFamily: 'Roboto'),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(
                      color: Colors.white, // Set the border color to green
                    ),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            const SizedBox(
              height: 8,
            ),
            const SurveyQuestionWidget(
              question: 'What medications is the patient taking?',
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
              child: TextField(
                style: const TextStyle(fontFamily: 'Roboto'),
                decoration: InputDecoration(
                  hintText: 'Enter answer here',
                  hintStyle: const TextStyle(fontFamily: 'Roboto'),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(
                      color: Colors.white, // Set the border color to green
                    ),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            const SurveyQuestionWidget(
              question: 'How does the patient feel emotionally and mentally?',
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
              child: TextField(
                style: const TextStyle(fontFamily: 'Roboto'),
                decoration: InputDecoration(
                  hintText: 'Enter answer here',
                  hintStyle: const TextStyle(fontFamily: 'Roboto'),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(
                      color: Colors.white, // Set the border color to green
                    ),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            const SurveyQuestionWidget(
              question:
                  'Does the patient get enough sleep (at least 8 hours a day), and is the patient overworking?',
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
              child: TextField(
                style: const TextStyle(fontFamily: 'Roboto'),
                decoration: InputDecoration(
                  hintText: 'Enter answer here',
                  hintStyle: const TextStyle(fontFamily: 'Roboto'),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(
                      color: Colors.white, // Set the border color to green
                    ),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  }
