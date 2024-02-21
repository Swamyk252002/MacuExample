package Mobile;

import java.net.URL;

import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import io.appium.java_client.service.local.AppiumServiceBuilder;

public class kid_secure {
 
	private static AppiumDriverLocalService service;
	public static void main(String[] args) {
		AppiumServiceBuilder builder = new AppiumServiceBuilder();
        builder.usingAnyFreePort(); // Use any available port
        builder.withArgument(() -> "--log-level", "debug"); // Set log level

        // Build the AppiumDriverLocalService
        service = AppiumDriverLocalService.buildService(builder);
        service.start(); // Start the Appium server
        DesiredCapabilities dc= new DesiredCapabilities();
        dc.setCapability(CapabilityType.BROWSER_NAME, "");
        dc.setCapability("deviceName", "emulator-5554");
        dc.setCapability("platformName", "Android");
        dc.setCapability("platformVersion", "12");
        dc.setCapability("automationName", "uiautomator2");
        dc.setCapability("appPackage", "com.unfoldlabs.kidsecure");
        dc.setCapability("appActivity", "com.unfoldlabs.kidsecure.ui.SplashActivity");
        URL u=service.getUrl();
        AndroidDriver driver;
        
        while(2>1) {
        	try {
        		driver= new AndroidDriver(u,dc);
        		break;
        	}
        	catch(Exception e) {
        		
        	}
        }
        
		
	}

}
