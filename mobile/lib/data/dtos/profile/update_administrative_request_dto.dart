// NEED TOKEN IN REQUEST

class UpdateAdministrativeRequestDTO {
  UpdateAdministrativeRequestDTO({
    required this.fullName,
    required this.gender,
    required this.birthday,
    required this.address,
    required this.nationalIdCard,
    required this.insurance,
    required this.profesion,
    required this.height,
    required this.weight,
  });

  Map<String, dynamic> toJson() => {
        'fullName': fullName,
        'gender': gender,
        'birthday': birthday,
        'address': address,
        'nationalIdCard': nationalIdCard,
        'insurance': insurance,
        'profesion': profesion,
        'height': height,
        'weight': weight,
      };

  final String fullName;
  final String gender;
  final DateTime birthday;
  final String address;
  final String nationalIdCard;
  final String insurance;
  final String profesion;
  final String height;
  final String weight;
}
