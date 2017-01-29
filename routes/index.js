var express = require('express');
var router = express.Router();
var MongoDB = require("./mongodbhandler");

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'IDSP'});
});

oldValues = ["arbovirus-suspected-2weeks",
	"arbovirus-suspected-4weeks",
	"arbovirus-suspected-cumulative-2015",
	"arbovirus-suspected-cumulative-2016",
	"confirmed-acute-fever",
	"confirmed-age-1-4",
	"confirmed-age-10-14",
	"confirmed-age-15-19",
	"confirmed-age-20-24",
	"confirmed-age-20to39",
	"confirmed-age-25-34",
	"confirmed-age-35-49",
	"confirmed-age-40to59",
	"confirmed-age-5-9",
	"confirmed-age-50-59",
	"confirmed-age-60-plus",
	"confirmed-age-60-64",
	"confirmed-age-over59",
	"confirmed-age-under-1",
	"confirmed-age-under20",
	"confirmed-age-unk",
	"confirmed-arthralgia",
	"confirmed-arthritis",
	"confirmed-conjunctivitis",
	"confirmed-eyepain",
	"confirmed-female",
	"confirmed-fever",
	"confirmed-headache",
	"confirmed-malaise",
	"confirmed-male",
	"confirmed-rash",
	"congenital-developmental-defects-reported-cummulative-2015-2016",
	"congenital-developmental-defects-reported-cumulative-2015-2016",
	"cumulative-cases-discarded",
	"cumulative-cases-under-study",
	"cumulative-confirmed",
	"cumulative-confirmed-imported-cases",
	"cumulative-confirmed-local-cases",
	"cumulative-probable-imported-cases",
	"cumulative-probable-local-cases",
	"cumulative-suspected-age-1-4",
	"cumulative-suspected-age-10-19",
	"cumulative-suspected-age-20-29",
	"cumulative-suspected-age-30-39",
	"cumulative-suspected-age-40-49",
	"cumulative-suspected-age-5-9",
	"cumulative-suspected-age-50-59",
	"cumulative-suspected-age-60-plus",
	"cumulative-suspected-age-under-1",
	"cumulative-suspected-pregnant",
	"cumulative-suspected-total",
	"efe-reported",
	"flavi-confirmed-cumulative-2016",
	"gbs-confirmed-cumulative",
	"gbs-reported",
	"gbs-reported-4weeks",
	"gbs-reported-cumulative",
	"GBS-reported-cumulative-2015-2016",
	"GBS-reported-cumulative-2015-2016-flavi",
	"GBS-reported-cumulative-2015-2016-zika",
	"gbs-zika-confirmed",
	"gbs-zika-confirmed-pregnant",
	"microcephaly-confirmed",
	"microcephaly-confirmed-cumulative",
	"microcephaly-fatal-confirmed",
	"microcephaly-fatal-not",
	"microcephaly-fatal-under-investigation",
	"microcephaly-not",
	"microcephaly-suspected",
	"microcephaly-suspected-4weeks",
	"microcephaly-suspected-cumulative",
	"microcephaly-under-investigation",
	"municipality-microcephaly",
	"municipality-microcephaly-suspected",
	"normal-birth-confirmed-zika",
	"total-zika-confirmed",
	"total-zika-confirmed-ages-0-11mo-F",
	"total-zika-confirmed-ages-0-11mo-M",
	"total-zika-confirmed-ages-1-4yrs-F",
	"total-zika-confirmed-ages-1-4yrs-M",
	"total-zika-confirmed-ages-10-14yrs-F",
	"total-zika-confirmed-ages-10-14yrs-M",
	"total-zika-confirmed-ages-15-19yrs-F",
	"total-zika-confirmed-ages-15-19yrs-M",
	"total-zika-confirmed-ages-20-49yrs-F",
	"total-zika-confirmed-ages-20-49yrs-M",
	"total-zika-confirmed-ages-5-9yrs-F",
	"total-zika-confirmed-ages-5-9yrs-M",
	"total-zika-confirmed-ages-50-64yrs-F",
	"total-zika-confirmed-ages-50-64yrs-M",
	"total-zika-confirmed-ages-over65-F",
	"total-zika-confirmed-ages-over65-M",
	"total-zika-confirmed-autochthonous",
	"total-zika-confirmed-cumulative",
	"total-zika-confirmed-F",
	"total-zika-confirmed-imported",
	"total-zika-confirmed-M",
	"total-zika-confirmed-Not-Aplicable",
	"total-zika-confirmed-pregnant",
	"total-zika-confirmed-pregnant-cumulative",
	"total-zika-new-confirmed-pcr",
	"total-zika-new-suspected",
	"total-zika-new-suspected-cumulative",
	"total-zika-suspected",
	"total-zika-suspected-cumulative",
	"total-zika-suspected-F",
	"total-zika-suspected-M",
	"weekly-hospitalized",
	"weekly-zika-confirmed",
	"weekly-Zika-confirmed-asymptomatic",
	"weekly-Zika-confirmed-imported",
	"weekly-Zika-confirmed-local",
	"weekly-Zika-confirmed-pending",
	"yearly-cumulative-female",
	"yearly-cumulative-male",
	"yearly-reported-travel-cases",
	"zika-confirmed-2weeks",
	"zika-confirmed-4weeks",
	"zika-confirmed-clinic",
	"zika-confirmed-cumulative-2015-2016",
	"zika-confirmed-cumulative-2016",
	"Zika-confirmed-F",
	"zika-confirmed-laboratory",
	"Zika-confirmed-laboratory-2015",
	"Zika-confirmed-laboratory-2016",
	"Zika-confirmed-M",
	"zika-confirmed-pcr-cumulative",
	"zika-confirmed-pregnant-asymptomatic-cumulative-2015-2016",
	"zika-confirmed-pregnant-cumulative",
	"zika-confirmed-pregnant-cumulative-2015-2016",
	"zika-confirmed-pregnant-symptomatic-cumulative-2015-2016",
	"zika-lab-positive",
	"Zika-negative-pregnant",
	"zika-new-confirmed-pcr-f",
	"zika-new-confirmed-pcr-m",
	"zika-no-specimen",
	"zika-not",
	"zika-pending",
	"Zika-positive-pregnant",
	"zika-reported",
	"zika-reported-local",
	"zika-reported-travel",
	"zika-suspected",
	"zika-suspected-4weeks",
	"zika-suspected-clinic",
	"zika-suspected-cumulative",
	"zika-suspected-pregnant",
	"zika-suspected-pregnant-cumulative"];

newValues = ["Malaria",
	"Measles",
	"Dengue",
	"Chikungunya",
	"Japanese Encephalitis",
	"Typhoid",
	"Tuberculosis",
	"Cholera",
	"Hepatitis A",
	"Hepatitis E",
	"Polio",
	"Unknown Disease leading to death",
	"Kala Azar",
	"Filariasis",
	"Antrhax",
	"Arsenicosis",
	"Avian Influenza",
	"Malaria",
	"Measles",
	"Dengue",
	"Chikungunya",
	"Japanese Encephalitis",
	"Typhoid",
	"Tuberculosis",
	"Cholera",
	"Hepatitis A",
	"Hepatitis E",
	"Polio",
	"Unknown Disease leading to death",
	"Kala Azar",
	"Filariasis",
	"Antrhax",
	"Arsenicosis",
	"Avian Influenza",
	"Malaria",
	"Measles",
	"Dengue",
	"Chikungunya",
	"Japanese Encephalitis",
	"Typhoid",
	"Tuberculosis",
	"Cholera",
	"Hepatitis A",
	"Hepatitis E",
	"Polio",
	"Unknown Disease leading to death",
	"Kala Azar",
	"Filariasis",
	"Antrhax",
	"Arsenicosis",
	"Avian Influenza",
	"Malaria",
	"Measles",
	"Dengue",
	"Chikungunya",
	"Japanese Encephalitis",
	"Typhoid",
	"Tuberculosis",
	"Cholera",
	"Hepatitis A",
	"Hepatitis E",
	"Polio",
	"Unknown Disease leading to death",
	"Kala Azar",
	"Filariasis",
	"Antrhax",
	"Arsenicosis",
	"Avian Influenza",
	"Malaria",
	"Measles",
	"Dengue",
	"Chikungunya",
	"Japanese Encephalitis",
	"Typhoid",
	"Suspected  Malaria",
	"Suspected Measles",
	"Suspected Dengue",
	"Suspected Chikungunya",
	"Suspected Japanese Encephalitis",
	"Suspected Typhoid",
	"Suspected Tuberculosis",
	"Suspected Cholera",
	"Suspected Hepatitis A",
	"Suspected Hepatitis E",
	"Suspected Polio",
	"Suspected Unknown Disease leading to death",
	"Suspected Kala Azar",
	"Suspected Filariasis",
	"Suspected Antrhax",
	"Suspected Arsenicosis",
	"Suspected Avian Influenza",
	"Suspected Malaria",
	"Suspected Measles",
	"Suspected Dengue",
	"Suspected Chikungunya",
	"Suspected Japanese Encephalitis",
	"Suspected Typhoid",
	"Suspected Tuberculosis",
	"Suspected Cholera",
	"Suspected Hepatitis A",
	"Suspected Hepatitis E",
	"Suspected Polio",
	"Suspected Unknown Disease leading to death",
	"Suspected Kala Azar",
	"Suspected Filariasis",
	"Suspected Antrhax",
	"Suspected Arsenicosis",
	"Suspected Avian Influenza",
	"Suspected Malaria",
	"Suspected Measles",
	"Suspected Dengue",
	"Suspected Chikungunya",
	"Suspected Japanese Encephalitis",
	"Suspected Typhoid",
	"Suspected Tuberculosis",
	"Suspected Cholera",
	"Suspected Hepatitis A",
	"Suspected Hepatitis E",
	"Suspected Polio",
	"Suspected Unknown Disease leading to death",
	"Suspected Kala Azar",
	"Suspected Filariasis",
	"Suspected Antrhax",
	"Suspected Arsenicosis",
	"Suspected Avian Influenza",
	"Suspected Malaria",
	"Suspected Measles",
	"Suspected Dengue",
	"Suspected Chikungunya",
	"Suspected Japanese Encephalitis",
	"Suspected Typhoid",
	"Suspected Tuberculosis",
	"Suspected Cholera",
	"Suspected Hepatitis A",
	"Suspected Hepatitis E",
	"Suspected Polio",
	"Suspected Unknown Disease leading to death",
	"Suspected Kala Azar",
	"Suspected Filariasis",
	"Suspected Antrhax",
	"Suspected Arsenicosis",
	"Suspected Avian Influenza",
	"Suspected Malaria",
	"Suspected Measles",
	"Suspected Dengue",
	"Suspected Chikungunya",
	"Suspected Japanese Encephalitis",
	"Suspected Typhoid"];
router.get("/populateDB", function (req, res, next) {
	populateProducts();
	res.send("OK");
});

populateProducts = function () {
	var i = 0;

	function myLoop(i) {
		setTimeout(function () {
			console.log(i);
			if (i < 1673) {
				var oldVal = oldValues[i];
				var newVal = newValues[i];
				i++;
				var cursor = MongoDB.collection("traindata").update(
					{"data-field": oldVal},
					{
						$set: {
							"data-field": newVal
						}
					},
					{ multi: true }
				);
				cursor.then(function (error) {
					if(error) {
						console.log(error);
					}
					console.log("Replaced " + oldVal + " by " + newVal);
				}).catch(function (error) {
					console.log("Error replacing " + oldVal + " by " + newVal);
					console.log("Error: " + error);
				});
				myLoop(i);
			} else {
				return;
			}

		}, 50);
	}

	myLoop(i);
};

module.exports = router;
