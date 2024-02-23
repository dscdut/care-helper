import 'package:flutter/material.dart';
import 'package:flutter_template/data/models/prescription_detail_model.dart';

class PrescriptionSingle extends StatelessWidget {
  const PrescriptionSingle({
    super.key, required this.prescriptionDetail,
    
  });

  final PrescriptionDetailModel prescriptionDetail;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: 0,
        color: Theme.of(context).primaryColor,
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    prescriptionDetail.medicineName,
                    style: Theme.of(context).textTheme.titleLarge!.copyWith(
                          fontWeight: FontWeight.w600,
                          color: Theme.of(context).scaffoldBackgroundColor,
                        ),
                  ),
                  const Spacer(),
                ],
              ),
              const SizedBox(
                height: 6,
              ),
              Text(
                '${prescriptionDetail.amount} - ${prescriptionDetail.usage}',
                style: Theme.of(context)
                    .textTheme
                    .bodyMedium!
                    .copyWith(color: Theme.of(context).scaffoldBackgroundColor),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
