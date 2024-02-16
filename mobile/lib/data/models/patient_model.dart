class PatientModel {
  PatientModel({
    required this.id,
    this.email,
    this.fullName,
    this.gender,
    this.phone,
    this.birthday,
    this.avatar,
    this.address,
    this.nationalIdCard,
    this.insurance,
    this.profesion,
    required this.active,
    this.weight,
    this.height,
  });

  factory PatientModel.fromJson(Map<String, dynamic> json) {
    return PatientModel(
      id: json['id'] as int,
      email: json['email'] as String?,
      fullName: json['fullName'] as String?,
      gender: json['gender'] as String?,
      phone: json['phone'] as String?,
      birthday: (json['birthday'] as String?) == null
          ? null
          : DateTime.tryParse(json['birthday'] as String),
      avatar: json['avatar'] as String?,
      address: json['address'] as String?,
      nationalIdCard: json['nationalIdCard'] as String?,
      insurance: json['insurance'] as String?,
      profesion: json['profesion'] as String?,
      active: json['active'] as bool,
      weight: json['weight'] as int?,
      height: json['height'] as int?,
    );
  }

  final int id;
  final String? email;
  final String? fullName;
  final String? gender;
  final String? phone;
  final DateTime? birthday;
  final String? avatar;
  final String? address;
  final String? nationalIdCard;
  final String? insurance;
  final String? profesion;
  final bool active;
  final int? weight;
  final int? height;
}
