import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/survey/widgets/survey_body_widget.dart';
import 'package:flutter_template/presentation/survey/widgets/survey_metadata_widget.dart';
import 'package:flutter_template/presentation/widgets/common_app_bar.dart';

class SurveyView extends StatelessWidget {
  const SurveyView({Key? key}) : super(key: key);

  void _showAlertDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Notification'),
          content: const Text('The survey has been saved'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        title: const Text('New Medical Survey'),
        hasBoxDecoration: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
                const SurveyMetadata(metadata: 'Date: 07/02/2024'),
                const SizedBox(
                  height: 16,
                ),
                const SurveyMetadata(metadata: 'Doctor: Dr. Lê Văn Liêm'),
                const SizedBox(
                  height: 30,
                ),
                const SurveyBodyWidget(),
                const SizedBox(
                  height: 20,
                ),
                buildButton(context), // Pass the context here
                const SizedBox(
                  height: 10,
                ),
                const SurveyMetadata(metadata: 'Back'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget buildButton(BuildContext context) {
    // Receive the context here
    return GestureDetector(
      onTap: () {
        _showAlertDialog(context);
      },
      child: Container(
        decoration: BoxDecoration(
          color: const Color(0xFFBDDDFD),
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Padding(
          padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Update',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'Roboto',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
