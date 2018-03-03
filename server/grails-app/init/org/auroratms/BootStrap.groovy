package org.auroratms

import com.opencsv.CSVReader
import grails.plugin.springsecurity.SecurityFilterPosition
import grails.plugin.springsecurity.SpringSecurityUtils
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.select.Elements
import tournament.insurance.AdditionalInsuredRole
import tournament.insurance.InsuranceRequestStatus
import tournament.sanction.SanctionRequestStatus

import java.text.DateFormat
import java.text.SimpleDateFormat


class BootStrap {

    def init = { servletContext ->
        // make all dates saved in this timezone
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))

        def userRole = new Role(authority: 'ROLE_USER').save()
        def tdRole = new Role(authority: 'ROLE_TOURNAMENT_DIRECTOR').save()
        //def facebookRole = new Role(authority: 'ROLE_FACEBOOK').save()
        SpringSecurityUtils.clientRegisterFilter("corsFilter", SecurityFilterPosition.SECURITY_CONTEXT_FILTER.order - 1)

        def swavek = new User(username: 'swaveklorenc@yahoo.com', password: 'swavek').save()
        def yichi = new User(username: 'yzhang2@mc.com', password: 'yichi').save()

        UserRole.create swavek, userRole
        UserRole.create swavek, tdRole

        UserRole.create yichi, userRole
        UserRole.create yichi, tdRole

        UserRole.withSession {
            it.flush()
            it.clear()
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-DD");
        createClub('Fox Valley Table Tennis Club', 'Eola Community Center', dateFormat.parse('2017-10-31'), '555 S. Eola Rd', 'Aurora','IL', 60504)
        createClub('Schaumburg Table Tennis Club', 'Community Recreation Center', dateFormat.parse('2017-05-31'), '505 N Springingsguth Rd.', 'Schaumburg','IL', 60609)
        createClub('Edge Table Tennis Club', null, dateFormat.parse('2017-11-31'), '318 E Golf Rd', 'Arlington Heights','IL', 60609)
        createClub('Experior Table Tennis Club', null, dateFormat.parse('2017-12-31'), '111 S Lombard Rd Unit 8', 'Addison','IL', 60101)
//        750.times {
//            createClub("Chicago Table Tennis Club ${it + 1}", null, dateFormat.parse('2017-12-31'), '2400 Chestnut Ave', 'Glenview','IL', 60101)
//        }

//        scrapeClubData ()
        //readClubData ()

        createSanctionRequest( '2018 Aurora Cup',  dateFormat.parse('2018-01-12'), dateFormat.parse('2018-01-14'), SanctionRequestStatus.Started, dateFormat.parse('2017-08-10'), 4)
        createSanctionRequest( '2018 Aurora Spring Open',  dateFormat.parse('2018-04-07'), dateFormat.parse('2018-04-07'), SanctionRequestStatus.Submitted, dateFormat.parse('2018-01-22'), 2)
        createSanctionRequest( '2018 Aurora Summer Open',  dateFormat.parse('2018-07-15'), dateFormat.parse('2018-07-15'), SanctionRequestStatus.Rejected, dateFormat.parse('2018-04-20'), 2)
        createSanctionRequest( '2018 Aurora Fall Open',  dateFormat.parse('2018-09-29'), dateFormat.parse('2018-09-29'), SanctionRequestStatus.Approved, dateFormat.parse('2018-07-29'), 2)

        createInsuranceRequest('Swavek Lorenc', 'swaveklorenc@yahoo.com', 'Fox Valley Table Tennis Club', '2018 Aurora Spring Open', InsuranceRequestStatus.Submitted)
        createInsuranceRequest('Mario Lorenc', 'mariolorenc@yahoo.com',  'Phoenix Table Tennis Club', '2018 Phoenix Sizzler Open ', InsuranceRequestStatus.Approved)
        createInsuranceRequest('Yichi Zhang', 'zyichi1@gmail.com', 'Experior', 'Spring Experior Giant Round Robin', InsuranceRequestStatus.Rejected)
        // add some more
        25.times {
            createInsuranceRequest("(${it + 1})nth Tournament Director",
                     "tourdir${it}@gmail.com",
                    'Nice Table Tennis Club',
                    '2018 Giant Round Robin',
                    InsuranceRequestStatus.Started)
        }

        10.times {
            new Todo(title: "Todo title + ${it}").save()
        }

        Todo.withSession {
            it.flush()
            it.clear()
        }

        // save USATT account information
        String stripePublicKey = System.getenv('USATT_STRIPE_PUBLIC_KEY')
        String stripeSecretKey = System.getenv('USATT_STRIPE_SECRET_KEY')
        if (stripePublicKey != null && stripeSecretKey != null) {
            new Account(system: true, gatewayType: 'Stripe', stripePublicKey: stripePublicKey, stripeSecretKey: stripeSecretKey).save(failOnError: true);
        }
    }

    def scrapeClubData () {
        println("Importing club information..")
        List<Club> allClubs = new ArrayList<>()
        // https://usatt.simplycompete.com/c/d?searchBy=&query=&state=&max=100
        // https://usatt.simplycompete.com/c/d?searchBy=&query=&state=&max=100&format=&offset=100
//        Document mainDoc = Jsoup.connect("https://usatt.simplycompete.com/c/d?embedded=true").get()
//        def results = mainDoc.select("div .listing")
//        def pagination = mainDoc.select('div .pagination')
        long start = System.currentTimeMillis()
        int clubsFound = 0
        int clubsImported = 0
        String location = "C:\\grails\\AuroraTMS5_Slim2\\server\\data\\"
        String baseURL = 'https://usatt.simplycompete.com'
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

        for (int i = 1; i <= 2 ; i++) {
            try {
//                String filename = location + "UsattClubsPage" + i + ".html"
                String filename = location + "UsattClubsPage" + i + "_WED.html"
                File input = new File(filename);
                Document doc = Jsoup.parse(input, "UTF-8", baseURL);
                //Elements listingDiv = doc.select("div .listing")
                //Elements clubClickHeaders = listingDiv.get(0).getElementsByClass("category-div-block")
                //Elements clubClickHeaders = listingDiv.get(0).getElementsByClass( "list-item")
                Elements tableBody = doc.select("tbody")
                if (tableBody.size() == 0) {
                    continue
                }
                Elements clubClickHeaders = tableBody.get(0).getElementsByTag("tr")
                Set<String> processedClubs = new HashSet<>()
                //println 'Found ' + clubClickHeaders.size() + ' clubClickHeaders'
                clubsFound += clubClickHeaders.size()
                if (clubClickHeaders.size() > 0) {
                    for (Element clubLinkHeader : clubClickHeaders) {
                        // location.href = '/c/p/224?v=c&query=&state=&searchBy=&embedded=&offset=100&max=100';
                        String onClick = clubLinkHeader.attr("onclick");
                        onClick = onClick.substring(onClick.indexOf('\'') + 1, onClick.lastIndexOf('\''))
                        String clubDetailsURL = baseURL + onClick
                        // println 'club details page url: ' + clubDetailsURL

                        def clubId = onClick.substring('/c/p/'.length(), onClick.indexOf('?'))
                        if (processedClubs.contains(clubId)) {
                            //println 'Club with id ' + clubId + 'already processed';
                            continue
                        }
                        processedClubs.add(clubId)

                        // get expiration date
                        Elements tdElements = clubLinkHeader.getElementsByTag('td')
                        Element lastTd = tdElements.get(tdElements.size() - 1)
                        String strExpirationDate = null
                        if (lastTd != null) {
                            strExpirationDate = lastTd.text()
                        }
                        //println "strExpirationDate = $strExpirationDate"

                        String clubDetailsFilename = location + 'clubDetails' + clubId + '.html'
                        File clubDetailsFile = new File(clubDetailsFilename)
//                        if (clubDetailsFile.exists() && clubDetailsFile.isFile()) {
//                            println('Skipping club ' + clubId)
//                            continue
//                        }

//                        try {
//                            print('Downloading from ' + clubDetailsURL + ' ... ')
//                            // write out the documents
//                            Document clubDetailsDoc = Jsoup.connect(clubDetailsURL).get()
//                            println 'OK'
//                            def html = clubDetailsDoc.html()
//                            // println "html = $html"
//                            FileWriter fileWriter = new FileWriter(clubDetailsFilename)
//                            fileWriter.write(html)
//                            fileWriter.flush()
//                            fileWriter.close()
//
//                            // wait to avoid read time out
//                            sleep(5000)
//                        } catch (Exception e) {
//                            println('Failed to parse cause: ' + e.getMessage())
//                        }

                        Document clubDetailsDoc2 = Jsoup.parse(clubDetailsFile, "UTF-8", baseURL);
                        Elements tabContentElements = clubDetailsDoc2.select('div .tab-content')
                        if (tabContentElements.size() > 0) {
                            Element tabContentsElement = tabContentElements.get(0);
                            Elements paragraphs = tabContentsElement.getElementsByTag('p')
                            if (paragraphs.size() > 0) {
                                String clubName = null
                                String buildingName = null
                                String streetAddress = null
                                String city = null
                                String state = null
                                String zipCode = null
                                String clubAdmin = null
                                String clubAdminEmail = null
                                String clubAdminPhone = null
                                String clubHours = null
                                String clubWebsite = null
                                String headerText = null
                                for (Element paragraph : paragraphs) {
                                    Elements headers = paragraph.select('strong')
                                    // header paragraph
                                    if (headers.size() > 0) {
                                        Element header = headers.get(0);
                                        headerText = header.text()
                                        headerText = headerText.replace(':', "")
                                        //print headerText
                                    } else {
                                        // value paragraph
                                        String paragraphText = paragraph.text()
                                        //println " - '" + paragraphText + "'"
                                        if (headerText.equals('Club Name')) {
                                           clubName = paragraphText
                                        } else if (headerText.equals('Address')) {
                                            String paraHTML = paragraph.html()
                                            //println 'Address HTML: ' + paraHTML
                                            String [] addressComponents = paraHTML.split("<br />")
                                            String cityState = null  // Massachusetts 01027 or MA 01027 or MA
                                            if (addressComponents.size() > 2) {
                                                buildingName = addressComponents[0].trim()
                                                streetAddress = addressComponents[1].trim()
                                                cityState = addressComponents[2].trim()
                                                if (streetAddress.length() == 0) {
                                                    streetAddress = buildingName
                                                    buildingName = ""
                                                }

                                                // Pleasant Hill Adventist Academy Gym<br /> 796 Grayson Rd. Pleasant Hill, CA 94523<br /> Pleasant Hill, CA </p>
                                                // handle city state repeated inside street address
                                                int found = streetAddress.indexOf(cityState)
                                                if (found != -1) {
                                                    cityState = streetAddress.substring(found)
                                                    streetAddress = streetAddress.substring(0, found)
                                                }
                                            } else {
                                                buildingName = ""
                                                streetAddress = addressComponents[0]
                                                cityState = addressComponents[1]
                                            }
                                            city = cityState.substring(0, cityState.indexOf(','))
                                            state = cityState.substring(cityState.indexOf(',') + 1).trim()
                                            if (state.matches(/(\w+\s)+\d{5}/)) {
                                                String tempState = state.substring(0, state.length() - 5)
                                                zipCode = state.substring(state.length() - 5)
                                                state = tempState.trim()
                                            } else if (state.matches(/(\w+\s)+\d{5}-\d{4}/)) {
                                                String tempState = state.substring(0, state.length() - 10)
                                                zipCode = state.substring(state.length() - 10)
                                                state = tempState.trim()
                                            }

                                            buildingName = buildingName.trim()
                                            streetAddress = streetAddress.trim()
                                            city = city.trim()
                                            state = state.trim()
                                            zipCode = (zipCode == null) ? "" : zipCode
                                            if (state.length() > 2) {
                                                // println 'long state name ' + state
                                                switch (state) {
                                                    case 'New York':
                                                        state = 'NY'
                                                        break
                                                    case 'West Virginia':
                                                        state = 'WV'
                                                        break
                                                    case 'Minnesota':
                                                        state = 'MN'
                                                        break
                                                    case 'California':
                                                        state = 'CA'
                                                        break
                                                    case 'Delaware':
                                                        state = 'DE'
                                                        break
                                                    case 'North Carolina':
                                                        state = 'NC'
                                                        break;
                                                    case 'Connecticut':
                                                        state = 'CT'
                                                        break
                                                    case 'New Jersey':
                                                        state = 'NJ'
                                                        break
                                                    case 'Florida':
                                                        state = 'FL'
                                                        break
                                                    case 'Kansas':
                                                        state = 'KS'
                                                        break
                                                    case 'Missouri':
                                                        state = 'MO'
                                                        break
                                                    case 'Massachusetts':
                                                        state = 'MA'
                                                        break
                                                    default:
                                                        println 'state name not translated for ' + state
                                                        break
                                                }
                                            }
                                        } else if (headerText.equals('Club Admin')) {
                                            Elements links = paragraph.getElementsByTag('a')
                                            for (Element link : links) {
                                                clubAdmin = link.text()
                                                break
                                            }
                                        } else if (headerText.equals('Email')) {
                                            clubAdminEmail = paragraphText
                                        } else if (headerText.equals('Hours and Dates')) {
                                            clubHours = paragraphText
                                        } else if (headerText.equals('Phone Number')) {
                                            clubAdminPhone = paragraphText.isEmpty() ? "000-0000-0000" : paragraphText
                                        } else if (headerText.equals("Club Website")) {
                                            // <a href="/userAccount/up/2812">David Hanson</a>
                                            Elements links = paragraph.getElementsByTag('a')
                                            for (Element link : links) {
                                                clubWebsite = link.attr("href");
                                            }
                                        }
                                        headerText = null
                                    }
                                }
//                                println '---------------------------------------------------------------------------------- ' + clubId
//                                println "clubName = $clubName"
//                                println "buildingName = $buildingName"
//                                println "streetAddress = $streetAddress"
//                                println "city = $city"
//                                println "state = $state"
//                                println "zipCode = $zipCode"
//                                println "clubHours = $clubHours"
//                                println "clubWebsite = $clubWebsite"
//                                println "clubAdmin = $clubAdmin"
//                                println "clubAdminEmail = $clubAdminEmail"
//                                println "clubAdminPhone = $clubAdminPhone"
//                                println "strExpirationDate = $strExpirationDate"
                                Date affiliationExpirationDate = dateFormat.parse(strExpirationDate)
                                Club club = new Club(
                                        name: clubName,
                                        buildingName: buildingName,
                                        streetAddress: streetAddress,
                                        city: city,
                                        state: state,
                                        zipCode: zipCode,
                                        clubAdminName: clubAdmin,
                                        clubAdminEmail: clubAdminEmail,
                                        hoursAndDates: clubHours,
                                        clubPhoneNumber : clubAdminPhone,
                                        clubPhoneNumber2 : null,
                                        clubWebsite : clubWebsite,
                                        affiliationExpirationDate: affiliationExpirationDate)
//                                allClubs.add(club)
                                club.save(flush: true, failOnError: true)
                                clubsImported++
                            }
                        }
                    }
                }
            } catch (Exception e) {
                println e.getMessage()
            }
            Club.withSession {
                it.flush()
                it.clear()
            }

        }
//        // write to JSON file
//        List<Club> someClubs = allClubs.subList(0, 10)
//        JsonBuilder builder = new JsonBuilder(someClubs)
//        def prettyJSON = builder.toPrettyString()
////        def json = JsonOutput.toJson(allClubs)
////        def json = JsonOutput.toJson(someClubs)
////        def prettyJSON = JsonOutput.prettyPrint(json)
//
//        FileWriter fileWriter = new FileWriter(location + 'allClubs.json')
//        fileWriter.write(prettyJSON)
//        fileWriter.flush()
//        fileWriter.close()

        long end = System.currentTimeMillis()
        long diff = end - start
        println "Import of (" + clubsFound + ", " + clubsImported + ") clubs info took " + diff + ' ms'
    }

    def readClubDataFromJSON () {

    }

//    def readClubData () {
//        String filename = "C:\\grails\\AuroraTMS5_Slim2\\server\\data\\ClubsData.csv"
//        CSVReader reader = new CSVReader(new FileReader(filename));
//        String [] nextLine = reader.readNext(); // skip head line
//        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
//        while ((nextLine = reader.readNext()) != null) {
//            String clubName = nextLine[0];
//            String contactEmail = nextLine[1];
//            String contactPhone = nextLine[2];
//            String state = nextLine[3];
//            String strDate = nextLine[4]
//            if (!strDate.empty) {
//                Date affiliationExpirationDate = dateFormat.parse(strDate)
//                createClub(clubName, affiliationExpirationDate, "1234 Nice Str", 'Any Town', state, 60000, contactEmail, contactPhone)
//            }
//        }
//    }

    def createClub(String clubName, String buildingName, Date affiliationExpirationDate, String streetAddress, String city, String state, Integer zipCode) {
        new Club(
                name: clubName,
                buildingName: buildingName,
                streetAddress: streetAddress,
                city: city,
                state: state,
                zipCode: zipCode,
                clubAdminName: 'Swavek Lorenc',
                clubAdminEmail: 'swaveklorenc@yahoo.com',
                hoursAndDates: 'Wednesday & Friday - 6:30 - 9:30PM',
                clubPhoneNumber : '630-222-3333',
                clubPhoneNumber2 : null,
                clubWebsite : 'https://www.fvttc.org',
                affiliationExpirationDate: affiliationExpirationDate)
                .save(flush: true, failOnError: true)
    }

    def createSanctionRequest(String tournamentName, Date startDate, Date endDate, SanctionRequestStatus status, Date requestDate, int starLevel) {
        new SanctionRequest(tournamentName: tournamentName,
                startDate: startDate,
                endDate: endDate,
                status: status,
                requestDate: requestDate,
                starLevel: starLevel,
                requestContentsJSON: "{}")
                .save(flush: true, failOnError: true)
    }

    def createInsuranceRequest (String contactName, String contactPersonEmail, String orgName, String eventName, InsuranceRequestStatus status) {
        new InsuranceRequest(
                orgName: orgName,
                orgStreetAddress : "1240 E Diehl Rd",
                orgCity : "Naperville",
                orgZip : 60540,
                orgState : "IL",
                requestDate : new Date(),
                contactName: contactName,
                contactPhoneNumber: "773-878-9090",
                contactEmail: contactPersonEmail,
                certFacilityName: 'Eola Community Center',
                certPersonName : "Mike Owald",
                certPersonPhoneNumber : "630-555-4545",
                certPersonEmail : "mowald@fvpd.org",
                certStreetAddress : "555 S. Eola Rd",
                certCity : "Aurora",
                certState : "IL",
                certZip : 60504,
                eventName: eventName,
                eventStartDate: new Date(),
                eventEndDate: new Date (),
                status: status,
                isAdditionalInsured: false,
                additionalInsuredRole : AdditionalInsuredRole.None
        ).save(flush: true, failOnError: true)

    }

    def destroy = {
    }

}
