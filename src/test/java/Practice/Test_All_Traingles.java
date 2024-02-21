package Practice;

public class Test_All_Traingles {

	public static void main(String[] args) {
		//String s="HasrithaAnanya";	
		String s="Swamy";	
		int t=0;
		for(int i=0;i<=s.length();i++) {
			for(int j=0;j<=i;j++) {
				if(t<s.length()) {
				char c=s.charAt(t);
				System.out.print(c);
				t++;
			}
			}
			System.out.println();
		}
		for(int i=0;i<s.length();i++) {
			for(int j=0;j<=i;j++) {
				char c=s.charAt(i);
				System.out.print(c);
			}
			System.out.println();
		}
		for(int i=0;i<s.length();i++) {
			for(int j=0;j<=i;j++) {
				char c=s.charAt(j);
				System.out.print(c);
			}System.out.println();
		}
		
		for(int i=s.length();i>=1;i--) {
			for(int j=0;j<i;j++) {
				char c=s.charAt(j);
				System.out.print(c);
			}
			System.out.println();
		}
		int rows = 5, k = 0, count = 0, count1 = 0;

	    for (int i = 1; i <= rows; i++) {
	      for (int space = 1; space <= rows - i; space++) {
	        System.out.print("  ");
	        ++count;
	      }
	      while (k != 2 * i - 1) {
	          if (count <= rows - 1) {
	            System.out.print((i + k) + " ");
	            ++count;
	          } else {
	            ++count1;
	            System.out.print((i + k - 2 * count1) + " ");
	          }

	          ++k;
	        }
	        count1 = count = k = 0;

	        System.out.println();
	      }
	      
	 
	    
	}

}
