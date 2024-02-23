import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/custom_color.dart';
import 'package:flutter_template/presentation/survey/view/survey_view.dart';

class NewSurveyWidget extends StatelessWidget {
  const NewSurveyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final CustomColor customColor = Theme.of(context).extension<CustomColor>()!;
    return Container(
      decoration: BoxDecoration(
        gradient: customColor.linearGradient,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        child: Row(
          children: [
            const Flexible(
              child: Text(
                'New medical survey available!',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: Color.fromARGB(255, 248, 250, 254),
                ),
              ),
            ),
            const SizedBox(
              width: 16,
            ),
            IconButton.filled(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const SurveyView()),
                );
              },
              icon: const Icon(Icons.navigate_next_sharp),
            )
          ],
        ),
      ),
    );
  }
}
